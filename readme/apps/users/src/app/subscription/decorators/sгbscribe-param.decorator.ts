import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SubscribeParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const isFollow = ctx.switchToHttp().getRequest().params[data];

    if ((isFollow === 'true') || (isFollow === '1')) {
      return true;
    }

    return false;
  },
);
