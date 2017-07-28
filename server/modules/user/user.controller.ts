import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UsePipes,
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as express from 'express';

import {
  ForgotPasswordUserValidator,
  LoginUserValidator,
  PasswordValidator,
  RegisterUserValidator,
} from '../../validators/user.validator';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { ValidatorPipe } from '../pipes/validator.pipe';
import { UserSerializer } from './user.serializer';
import { UserService } from './user.service';

@Controller()
export class UserController {
  service: UserService;
  private serializer: UserSerializer;

  constructor(
    userService: UserService,
    userSerializer: UserSerializer,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.service = userService;
    this.serializer = userSerializer;
  }

  @Get('user')
  async getUser(@Request() req: any, @Response() res: express.Response) {
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(req.user));
  }

  @Post('user/token')
  @UsePipes(new ValidatorPipe())
  async generateToken(
    @Response() res: express.Response,
    @Body('user') user: LoginUserValidator
  ) {
    try {
      const token = await this.service.generateToken(user);
      res.status(HttpStatus.CREATED).json({ token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user')
  @UsePipes(new ValidatorPipe())
  async addUser(
    @Response() res: express.Response,
    @Body('user') user: RegisterUserValidator
  ) {
    try {
      const password = user.password;
      const registeredUser = await this.service.add(user);
      user.password = password;
      const token = await this.service.generateToken(user);
      res
        .status(HttpStatus.CREATED)
        .json(this.serializer.serializeTokenAndUser(registeredUser, token));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user/forgot-password')
  @UsePipes(new ValidatorPipe())
  async forgotPassword(
    @Request() req: any,
    @Response() res: express.Response,
    @Body('user') user: ForgotPasswordUserValidator
  ) {
    try {
      await this.service.forgotPassword(user, req);
      res.status(HttpStatus.ACCEPTED).json({ success: true });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Patch('user/recover-password/:forgotPasswordId')
  async recoverPassword(
    @Response() res: express.Response,
    @Param('forgotPasswordId') forgotPasswordId: string,
    @Body('user') forgotUser: PasswordValidator
  ) {
    const { password } = forgotUser;
    const forgottenPassword = await this.forgotPasswordService.get(
      forgotPasswordId
    );
    if (!forgottenPassword) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const { user } = forgottenPassword;
    await user.setHashedPassword(password);
    await this.service.update(user);
    res.status(HttpStatus.ACCEPTED).json(this.serializer.serializeFull(user));
    await this.forgotPasswordService.delete(forgotPasswordId);
  }

  @Delete('user/:id')
  async deleteUser(@Request() req: any, @Response() res: express.Response) {
    const { user } = req;
    const deletedUser = await this.service.remove(user);
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(deletedUser));
  }
}
