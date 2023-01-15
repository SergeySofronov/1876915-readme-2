import * as Joi from 'joi';

const DEFAULT_SMTP_PORT = 5025;

export const envMailSchema = Joi.object({
  MAIL_USER_NAME: Joi
    .string()
    .required(),
  MAIL_SMTP_HOST: Joi
    .string()
    .hostname()
    .required(),
  MAIL_SMTP_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_SMTP_PORT)
    .required(),
  MAIL_USER_PASSWORD: Joi
    .string(),
  MAIL_FROM: Joi
    .string()
    .required()
});
