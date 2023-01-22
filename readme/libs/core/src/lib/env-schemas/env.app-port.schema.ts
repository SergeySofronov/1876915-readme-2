import * as Joi from 'joi';

const DEFAULT_APP_PORT = 3333;

export const envAppPortSchema = Joi.object({
  APP_PORT: Joi
  .number()
  .port()
  .default(DEFAULT_APP_PORT)
  .required(),
});
