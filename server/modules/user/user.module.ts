import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { ForgotPasswordModule } from '../forgot-password/forgot-password.module';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { UserController } from './user.controller';
import { UserSerializer } from './user.serializer';
import { UserService } from './user.service';

@Module({
  components: [
    UserService,
    DatabaseConfig,
    UserSerializer,
    ForgotPasswordService,
    EmailService,
  ],
  controllers: [UserController],
  modules: [DatabaseModule, ForgotPasswordModule, EmailModule],
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
        method: RequestMethod.DELETE,
        path: 'user/:id',
      });
  }
}
