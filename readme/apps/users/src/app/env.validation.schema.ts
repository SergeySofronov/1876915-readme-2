import { envFileUploadSchema, envJwtSchema, envMongoSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envJwtSchema)
  .concat(envMongoSchema)
  .concat(envFileUploadSchema)
  .concat(envRabbitSchema);
