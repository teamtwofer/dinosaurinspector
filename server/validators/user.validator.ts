import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ILoginUser, IRegisterUser } from '../../types/user';

// tslint:disable:max-classes-per-file

class BaseUserValidator {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class PasswordValidator {
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

class BaseUserWithPasswordValidator extends BaseUserValidator {
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class LoginUserValidator extends BaseUserWithPasswordValidator
  implements ILoginUser {}

export class RegisterUserValidator extends BaseUserWithPasswordValidator
  implements IRegisterUser {
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class ForgotPasswordUserValidator extends BaseUserValidator {}
