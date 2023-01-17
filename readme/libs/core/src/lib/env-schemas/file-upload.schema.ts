import * as Joi from 'joi';

export const envFileUploadSchema = Joi.object({
  FILE_UPLOAD_DEST: Joi
    .string()
    .required(),
  FILE_MAX_SIZE: Joi
    .number()
    .required(),
  FILE_EXT_REGEXP: Joi
    .string()
    .required(),
});
