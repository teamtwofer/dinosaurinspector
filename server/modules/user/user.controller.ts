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
  async getUser(@Req() req, @Res() res: Response) {
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(req.user));
  }

  @Post('user/token')
  async generateToken(@Res() res, @Body('user') user: Partial<IRegisterUser>) {
    try {
      const token = await this.service.generateToken(user);
      res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('user/:id')
  async deleteUser(@Req() req, @Res() res: Response) {
    const { user } = req;
    const deletedUser = await this.service.remove(user);
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(deletedUser));
  }
}
