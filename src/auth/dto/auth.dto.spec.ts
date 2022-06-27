import { AuthDto } from './auth.dto';

describe('AuthDto', () => {
  let authDto: AuthDto;

  beforeEach(() => {
    authDto = new AuthDto();
    authDto.pwd = 'Password';
    authDto.eMail = 'Email';
  });

  describe('constructor', () => {
    it('should return Password', () => {
      expect(authDto.pwd).toBe('Password');
    });
    it('should return Email', () => {
      expect(authDto.eMail).toBe('Email');
    });
  });
});
