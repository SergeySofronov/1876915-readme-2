import { envJwtSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envJwtSchema)
  .concat(envRabbitSchema);
