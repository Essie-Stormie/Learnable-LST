import Joi from "joi";

export const createAccountSchema = Joi.object({
  firstName: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  dateOfBirth: Joi.date().less("now").required(),
}).messages({
  "date.less": "Date of birth must be in the past",
});

export const recursiveObjectSchema = Joi.object().pattern(Joi.string(), [
  Joi.string(),
  Joi.object().pattern(Joi.string(), Joi.string()),
  Joi.array().items(
    Joi.string(),
    Joi.object().pattern(Joi.string(), Joi.string())
  ),
]);
