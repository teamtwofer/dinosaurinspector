import { validate } from 'class-validator';
import { LoginUserValidator, RegisterUserValidator } from '../user.validator';

describe('User Validators', () => {
  describe('LoginUserValidator', () => {
    let loginValidator: LoginUserValidator;
    beforeEach(() => {
      loginValidator = new LoginUserValidator();
      loginValidator.email = 'ben@twofer.co';
      loginValidator.password = '8 characters at least';
    });

    it('should allow a valid user', async () => {
      expect(await validate(loginValidator)).toHaveLength(0);
    });

    it('should not allow a user with an empty email', async () => {
      delete loginValidator.email;
      expect(await validate(loginValidator)).toHaveLength(1);
    });

    it('should not allow an invalid email', async () => {
      loginValidator.email = 'not an email';
      expect(await validate(loginValidator)).toHaveLength(1);
    });

    it('should not allow an invalid password', async () => {
      loginValidator.password = '7 chars';
      expect(await validate(loginValidator)).toHaveLength(1);
    });

    it('should not allow a user with no password', async () => {
      delete loginValidator.password;
      expect(await validate(loginValidator)).toHaveLength(1);
    });
  });

  describe('RegisterUserValidator', () => {
    let registerValidator: RegisterUserValidator;
    beforeEach(() => {
      registerValidator = new RegisterUserValidator();
      registerValidator.email = 'ben@twofer.co';
      registerValidator.password = '8 characters at least';
      registerValidator.name = 'Ben Bayard';
    });

    it('should allow a valid user', async () => {
      expect(await validate(registerValidator)).toHaveLength(0);
    });

    it('should not allow a user with an empty name', async () => {
      delete registerValidator.name;
      expect(await validate(registerValidator)).toHaveLength(1);
    });

    it('should not allow an invalid name', async () => {
      registerValidator.name = ':(';
      expect(await validate(registerValidator)).toHaveLength(1);
    });
  });
});
