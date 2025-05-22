import { APIError } from "../utils/error.util";
import { Request, Response, NextFunction } from "express";
import { Error as ErrorNamespace } from "mongoose";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("An error occurred: ", error);

  if (error instanceof ErrorNamespace.ValidationError) {
    let errors: Record<string, string> = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    res.status(400).json({
      success: false,
      message: error.message,
      errors,
    });
    return;
  }

  if (error instanceof ErrorNamespace) {
    let errors: Record<string, string> = {};

    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof APIError) {
    res.status(error.statusCode ?? (Number(error.status) || 400)).json({
      success: false,
      ...error.body,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
