import { envFileUploadSchema, envJwtSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envJwtSchema)
  .concat(envFileUploadSchema)
  .concat(envRabbitSchema);
