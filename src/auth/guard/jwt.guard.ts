import { AuthGuard } from '@nestjs/passport';

/* istanbul ignore file */
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
