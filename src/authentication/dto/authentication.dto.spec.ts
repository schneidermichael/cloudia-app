import { AuthenticationDto } from './authentication.dto';

describe('AuthDto', () => {
  let authenticationDto: AuthenticationDto;

  beforeEach(() => {
    authenticationDto = new AuthenticationDto();
    authenticationDto.password = 'Password';
    authenticationDto.email = 'Email';
  });

  describe('constructor', () => {
    it('should return password', () => {
      expect(authenticationDto.password).toBe('Password');
    });
    it('should return email', () => {
      expect(authenticationDto.email).toBe('Email');
    });
  });
});
