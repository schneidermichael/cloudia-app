import { ResetPasswordDto } from './reset-password.dto';

describe('ResetPwdDto', () => {
  let resetPasswordDto: ResetPasswordDto;

  beforeEach(() => {
    resetPasswordDto = new ResetPasswordDto();
    resetPasswordDto.email = 'Email';
  });

  describe('constructor', () => {
    it('should return Email', () => {
      expect(resetPasswordDto.email).toBe('Email');
    });
  });
});
