import 'reflect-metadata';

import { Test } from '@nestjs/testing';
import { Response } from 'express';

import { IRegisterUser } from '../../../../types/user';
import { User } from '../../../entities/user.entity';
import { DatabaseConfig } from '../../database/database.config';
import { DatabaseService } from '../../database/database.service';
import { UserController } from '../user.controller';
import { UserSerializer } from '../user.serializer';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let db: DatabaseService;
  let jsonResonse: object;
  let ben: IRegisterUser;
  let user: User;

  const response: Response = {
    status: () => ({
      json: (j: object) => {
        jsonResonse = j;
      },
    }),
  } as any;

  beforeEach(async () => {
    Test.createTestingModule({
      components: [
        UserService,
        UserSerializer,
        DatabaseConfig,
        DatabaseService,
      ],
      controllers: [UserController],
    });

    ben = {
      email: 'ben@twofer.co',
      name: 'ben',
      password: 'potato',
    };

    controller = Test.get<UserController>(UserController);
    db = Test.get(DatabaseService);
    jsonResonse = {};
    user = await controller.service.add(ben);
    ben.password = 'potato';
    return;
  });

  afterEach(async () => {
    const users = await controller.service.getAll();
    await Promise.all(users.map(controller.service.remove));
    const connection = await db.connection;
    await connection.dropDatabase();
    await connection.close();
    return;
  });

  it('GET /user/:id', async () => {
    await controller.getUser({ user }, response);
    expect(jsonResonse).toMatchSnapshot();
  });

  it('GET /user/token', async () => {
    await controller.generateToken(response, ben);
    expect((jsonResonse as any).token).toBeDefined();
  });

  it('DELETE /user/:id', async () => {
    await controller.deleteUser({ user: { ...user } }, response);
    expect(jsonResonse).toMatchSnapshot();
  });
});
