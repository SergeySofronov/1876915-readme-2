import { envAppPortSchema, envFileUploadSchema, envJwtSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envAppPortSchema)
  .concat(envJwtSchema)
  .concat(envFileUploadSchema)
  .concat(envRabbitSchema);
