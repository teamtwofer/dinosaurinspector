import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Response } from 'express';
import { IRegisterUser } from '../../../types/user';
import { UserSerializer } from './user.serializer';

import { ICrud } from '../../../types/crud';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  private service: ICrud<User, IRegisterUser>;
  private serializer: UserSerializer;

  constructor(userService: UserService, userSerializer: UserSerializer) {
    this.service = userService;
    this.serializer = userSerializer;
  }

  @Get('users')
  async getAllUsers(@Req() _req, @Res() res: Response) {
    const users = await this.service.getAll();
    res.status(HttpStatus.OK).json(users.map(this.serializer.serializeFull));
  }

  @Get('user/:id')
  async getUser(@Req() _req, @Res() res: Response, @Param('id') id: number) {
    const user = await this.service.get(id);
    if (!user) {
      throw new HttpException('Employee not found.', 404);
    }
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(user));
  }

  @Delete('user/:id')
  async deleteUser(@Req() _req, @Res() res: Response, @Param('id') id: number) {
    const user = await this.service.get(id);
    if (!user) {
      throw new HttpException('Employee not found.', 404);
    }
    const deletedUser = await this.service.remove(user);
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(deletedUser));
  }
}
