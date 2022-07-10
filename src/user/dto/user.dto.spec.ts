import { UserDto } from './user.dto';

describe('AuthDto', () => {
  let userDto: UserDto;

  beforeEach(() => {
    userDto = new UserDto();
    userDto.email = 'Email';
    userDto.password = 'Password';
    userDto.first_name = 'John';
    userDto.last_name = 'Doe';
  });

  describe('constructor', () => {
    it('should return eMail', () => {
      expect(userDto.email).toBe('Email');
    });
    it('should return pwd', () => {
      expect(userDto.password).toBe('Password');
    });
    it('should return firstName', () => {
      expect(userDto.first_name).toBe('John');
    });
    it('should return lastName', () => {
      expect(userDto.last_name).toBe('Doe');
    });
  });
});
