import 'reflect-metadata';

import { Test } from '@nestjs/testing';
import { IRegisterUser } from '../../../../types/user';
import { User } from '../../../entities/user.entity';
import { DatabaseModule } from '../..//database/database.module';
import { DatabaseConfig } from '../../database/database.config';
import { DatabaseService } from '../../database/database.service';
import { EmailModule } from '../../email/email.module';
import { EmailService } from '../../email/email.service';
import { ForgotPasswordModule } from '../../forgot-password/forgot-password.module';
import { ForgotPasswordService } from '../../forgot-password/forgot-password.service';
import { UserSerializer } from '../user.serializer';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  let db: DatabaseService;
  let ben: IRegisterUser;
  let user: User;
  let mailerCalled: jest.EmptyFunction;

  beforeEach(async () => {
    mailerCalled = jest.fn();
    Test.createTestingModule({
      components: [
        UserService,
        DatabaseConfig,
        UserSerializer,
        ForgotPasswordService,
        {
          provide: EmailService,
          useValue: {
            sendForgotPasswordEmail: () => {
              mailerCalled();
              return Promise.resolve();
            },
          },
        },
      ],
      modules: [DatabaseModule, ForgotPasswordModule, EmailModule],
    });

    ben = {
      email: 'ben@twofer.co',
      name: 'ben',
      password: 'potato',
    };

    service = Test.get<UserService>(UserService);
    db = Test.get(DatabaseService);
    user = await service.add(ben);
    return;
  });

  afterEach(async () => {
    const connection = await db.connection;
    await connection.dropDatabase();
    await connection.close();
    return;
  });

  it('should add a user', async () => {
    expect(user.id).not.toBe(null);
  });

  it('should get all users', async () => {
    expect(await service.get(user.id)).toMatchObject({
      email: ben.email,
    });
    expect(await service.getAll()).toHaveLength(1);
  });

  it('should update a user', async () => {
    user.email = 'new@mail.com';
    const updatedUser = await service.update(user);
    expect(updatedUser.email).toBe('new@mail.com');
  });

  it('should remove a user', async () => {
    await service.remove(user);
    expect(await service.getAll()).toHaveLength(0);
  });

  it('should reset passwords for users', async () => {
    await service.forgotPassword(ben, { headers: {} });
    expect(mailerCalled).toBeCalled();
  });

  it('should not send mails for users that do not exist', async () => {
    await service.forgotPassword(
      { email: 'ben@whatevenisthis.com' },
      { headers: {} }
    );
    return expect(mailerCalled).not.toBeCalled();
  });

  it('should generate a token for a user', async () => {
    const token = await service.generateToken({
      email: 'ben@twofer.co',
      password: 'potato',
    });
    return expect(token).toBeDefined();
  });

  it('should throw an error for a non-matching email', async () => {
    try {
      await service.generateToken({
        email: 'fake email',
        password: 'potato',
      });
    } catch (e) {
      expect(e).toBeDefined();
      return;
    }
    expect(false).toBe(true);
  });

  it('should throw an error for a non-matching password', async () => {
    try {
      await service.generateToken({
        email: 'ben@twofer.co',
        password: 'FAKE PASSWORD',
      });
    } catch (e) {
      expect(e).toBeDefined();
      return;
    }
    expect(false).toBe(true);
  });

  it('should allow a user in with a valid token', async () => {
    const token = await service.generateToken({
      email: 'ben@twofer.co',
      password: 'potato',
    });
    const userId = await service.validateToken(token);
    return expect(userId).toEqual(user.id);
  });

  it('should not allow a user in if they have an invalid token', async () => {
    try {
      await service.validateToken('');
    } catch (e) {
      expect(e).toBeDefined();
      return;
    }
    expect(false).toBe(true);
  });
});
