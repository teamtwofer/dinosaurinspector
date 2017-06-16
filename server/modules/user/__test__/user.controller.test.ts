import 'reflect-metadata';

import { Test } from '@nestjs/testing';
import { Response } from 'express';

import { DatabaseConfig } from '../../database/database.config';
import { DatabaseService } from '../../database/database.service';
import { UserController } from '../user.controller';
import { UserSerializer } from '../user.serializer';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let db: DatabaseService;
  let jsonResonse: object;

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

    controller = Test.get<UserController>(UserController);
    db = Test.get(DatabaseService);
    jsonResonse = {};
  });

  afterEach(async () => {
    const users = await controller.service.getAll();
    await Promise.all(users.map(controller.service.remove));
    const connection = await db.connection;
    await connection.dropDatabase();
    await connection.close();
    return;
  });

  it('GET /users', async () => {
    const ben = {
      email: 'ben@twofer.co',
      name: 'ben',
      password: 'potato',
    };

    await controller.service.add(ben);

    const liam = {
      email: 'liam@twofer.co',
      name: 'liam',
      password: 'potato',
    };

    await controller.service.add(liam);
    await controller.getAllUsers(null, response);

    expect(jsonResonse).toMatchSnapshot();
  });

  it('GET /user/:id', async () => {
    const ben = {
      email: 'ben@twofer.co',
      name: 'ben',
      password: 'potato',
    };

    const user = await controller.service.add(ben);
    await controller.getUser(null, response, user.id);
    expect(jsonResonse).toMatchSnapshot();
  });

  it('DELETE /user/:id', async () => {
    const ben = {
      email: 'ben@twofer.co',
      name: 'ben',
      password: 'potato',
    };

    const user = await controller.service.add(ben);
    await controller.deleteUser(null, response, user.id);
    expect(jsonResonse).toMatchSnapshot();
  });
});
