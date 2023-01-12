import * as Joi from 'joi';

const RABBIT_NOTIFY_SERVICE_QUEUE = 'Classic';

export default Joi.object({
  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_HOST: Joi
    .string()
    .hostname()
    .required(),
  RABBIT_PASSWORD: Joi
    .string(),
  RABBIT_NOTIFY_SERVICE_QUEUE: Joi
    .string()
    .default(RABBIT_NOTIFY_SERVICE_QUEUE)
    .required()
});
