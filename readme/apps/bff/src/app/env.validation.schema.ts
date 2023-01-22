import { envAppPortSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  USER_SERVICE_NAME: Joi
    .string()
    .required(),
  USER_SERVICE_HOST: Joi
    .string()
    .hostname()
    .required(),
  USER_SERVICE_PORT: Joi
    .number()
    .port()
    .required(),
  BLOG_SERVICE_NAME: Joi
    .string()
    .required(),
  BLOG_SERVICE_HOST: Joi
    .string()
    .hostname()
    .required(),
  BLOG_SERVICE_PORT: Joi
    .number()
    .port()
    .required(),
})
  .concat(envAppPortSchema)
