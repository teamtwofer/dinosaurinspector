export interface IUser {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  password: string;
}

export interface IForgotUser {
  email: string;
}
