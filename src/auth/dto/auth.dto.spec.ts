import { AuthDto } from './auth.dto';

describe('AuthDto', () => {
  let authDto: AuthDto;

  beforeEach(() => {
    authDto = new AuthDto();
    authDto.pwd = 'Password';
    authDto.eMail = 'Email';
  });



  describe('constructor', () => {
    it('should return pwd', () => {
      expect(authDto.pwd).toBe('Password');
    });
    it('should return eMail', () => {
      expect(authDto.eMail).toBe('Email');
    });
  });
});
