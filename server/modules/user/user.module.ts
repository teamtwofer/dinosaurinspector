import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserSerializer } from './user.serializer';
import { UserService } from './user.service';

@Module({
  components: [UserService, DatabaseConfig, UserSerializer],
  controllers: [UserController],
  modules: [DatabaseModule],
})
export class UserModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        method: RequestMethod.GET,
        path: 'user',
      })
      .apply(AuthMiddleware)
      .forRoutes({
        method: RequestMethod.GET,
        path: 'user/:id',
      })
      .apply(AuthMiddleware)
      .forRoutes({
        method: RequestMethod.DELETE,
        path: 'user/:id',
      });
  }
}
