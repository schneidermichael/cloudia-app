import { UserDto } from './user.dto';

describe('AuthDto', () => {
  let userDto: UserDto;

  beforeEach(() => {
    userDto = new UserDto();
    userDto.eMail = 'Email';
    userDto.pwd = 'Password';
    userDto.firstName = 'John';
    userDto.lastName = 'Doe';
    userDto.title = 'BSc';
  });

  describe('constructor', () => {
    it('should return eMail', () => {
      expect(userDto.eMail).toBe('Email');
    });
    it('should return pwd', () => {
      expect(userDto.pwd).toBe('Password');
    });
    it('should return firstName', () => {
      expect(userDto.firstName).toBe('John');
    });
    it('should return lastName', () => {
      expect(userDto.lastName).toBe('Doe');
    });
    it('should return title', () => {
      expect(userDto.title).toBe('BSc');
    });
  });
});
