import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SubscribeParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const booleanParameter = ctx.switchToHttp().getRequest().params[data];

    if ((booleanParameter === 'true') || (booleanParameter === '1')) {
      return true;
    }

    return false;
  },
);
