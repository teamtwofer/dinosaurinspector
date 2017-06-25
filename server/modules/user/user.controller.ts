import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Response } from 'express';

import { IRegisterUser } from '../../../types/user';
import { UserSerializer } from './user.serializer';
import { UserService } from './user.service';

@Controller()
export class UserController {
  service: UserService;
  private serializer: UserSerializer;

  constructor(userService: UserService, userSerializer: UserSerializer) {
    this.service = userService;
    this.serializer = userSerializer;
  }

  @Get('user')
  async getUser(@Req() req: any, @Res() res: Response) {
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(req.user));
  }

  @Post('user/token')
  async generateToken(
    @Res() res: Response,
    @Body('user') user: Partial<IRegisterUser>
  ) {
    console.log('token\n\n\n', user);
    try {
      const token = await this.service.generateToken(user);
      res.status(HttpStatus.CREATED).json({ token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user')
  async addUser(@Req() req: any, @Res() res: Response, @Body('user') blah) {
    const { user } = req.body;
    console.log('\n\n\n', blah, '\n\n\n');
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

  @Delete('user/:id')
  async deleteUser(@Req() req: any, @Res() res: Response) {
    const { user } = req;
    const deletedUser = await this.service.remove(user);
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(deletedUser));
  }
}
