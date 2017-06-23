import { HttpStatus, Middleware, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { autobind } from 'core-decorators';
import { UserService } from '../user/user.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  constructor(private service: UserService) {}

  @autobind
  resolve() {
    return async (req: any, _res: any, next: () => void) => {
      const token = req.headers['x-access-token'];
      if (!token) {
        throw new HttpException(
          'Login Token not found. ',
          HttpStatus.NOT_ACCEPTABLE
        );
      }
      let id: number;
      try {
        id = await this.service.validateToken(token);
      } catch (e) {
        throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
      }

      const user = await this.service.get(id);
      if (!user) {
        throw new HttpException('User not found.', 404);
      }
      req.user = user;
      next();
    };
  }
}
