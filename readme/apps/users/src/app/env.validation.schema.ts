import { envJwtSchema, envMongoSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envJwtSchema)
  .concat(envMongoSchema)
  .concat(envRabbitSchema);
