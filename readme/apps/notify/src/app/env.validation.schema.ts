import { envMailSchema, envMongoSchema, envRabbitSchema } from '@readme/core';
import * as Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envMongoSchema)
  .concat(envRabbitSchema)
  .concat(envMailSchema);
