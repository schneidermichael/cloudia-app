import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/* istanbul ignore file */
export const GetUsersProfil = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      //console.log(request.user[data])
      return request.user[data];
    }
    //console.log(request.user)
    return request.user;
  },
);
