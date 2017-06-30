import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as express from 'express';

// import { IRegisterUser } from '../../../types/user';
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
  async getUser(@Request() req: any, @Response() res: express.Response) {
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(req.user));
  }

  @Post('user/token')
  async generateToken(@Request() req: any, @Response() res: express.Response) {
    const { user } = req.body;
    try {
      const token = await this.service.generateToken(user);
      res.status(HttpStatus.CREATED).json({ token });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('user')
  async addUser(@Request() req: any, @Response() res: express.Response) {
    const { user } = req.body;
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
  async forgotPassword(@Request() req: any, @Response() res: express.Response) {
    const { user } = req.body;
    try {
      await this.service.forgotPassword(user);
      res.status(HttpStatus.ACCEPTED).send();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete('user/:id')
  async deleteUser(@Request() req: any, @Response() res: express.Response) {
    const { user } = req;
    const deletedUser = await this.service.remove(user);
    res.status(HttpStatus.OK).json(this.serializer.serializeFull(deletedUser));
  }
}
