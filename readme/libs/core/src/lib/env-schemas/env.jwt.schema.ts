import * as Joi from 'joi';

export const envJwtSchema = Joi.object({
  JWT_SECRET: Joi
    .string()
    .required(),
});
