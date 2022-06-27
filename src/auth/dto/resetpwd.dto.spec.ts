import { ResetPwdDto } from './resetpwd.dto';

describe('ResetPwdDto', () => {
  let resetPwdDto: ResetPwdDto;

  beforeEach(() => {
    resetPwdDto = new ResetPwdDto();
    resetPwdDto.eMail = 'Email';
  });

  describe('constructor', () => {
    it('should return Email', () => {
      expect(resetPwdDto.eMail).toBe('Email');
    });
  });
});
