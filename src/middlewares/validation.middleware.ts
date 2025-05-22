import Joi from "joi";
import { APIError } from "../utils/error.util";
import { formatJoiError } from "../utils/error.util";
import { Request, Response, NextFunction } from "express";
import { getNestedValue, normalizeSearchParams } from "../utils/index.util";
import { setNestedValue } from "../utils/index.util";

interface ValidationOption {
  path: string;
  schema?: Joi.Schema;
  required?: boolean;
}

class ValidationMiddleware {
  validate(validationOptions: ValidationOption[] | ValidationOption) {
    validationOptions = Array.isArray(validationOptions)
      ? validationOptions
      : [validationOptions];

    return async (req: Request, _res: Response, next: NextFunction) => {
      const requestObject = req as unknown as Record<string, unknown>;

      for (const option of validationOptions) {
        const value = getNestedValue(requestObject, option.path);
        const isRequired = option.required ?? true;

        if (!isRequired && value === undefined) continue;

        if (option.schema) {
          const validatedValue = await this.validateJoiSchema(
            option.schema,
            value
          );

          if (option.path === "query") {
            const [oldUrl, oldQuery] = (requestObject.url as string).split("?");
            const newQuery = new URLSearchParams(
              normalizeSearchParams(validatedValue)
            );
            requestObject.url = `${oldUrl}?${newQuery.toString()}`;
          } else {
            setNestedValue(requestObject, option.path, validatedValue);
          }
        }
      }
      next();
    };
  }

  private async validateJoiSchema<T>(schema: Joi.Schema<T>, data: T) {
    try {
      const value = await schema.validateAsync(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      return value;
    } catch (error) {
      throw new APIError("BAD_REQUEST", {
        message: "Validation Error",
        errors: formatJoiError(error as Joi.ValidationError),
      });
    }
  }
}

export const validationMiddleware = new ValidationMiddleware();
