import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* istanbul ignore file */
export const GetUserProfile = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
