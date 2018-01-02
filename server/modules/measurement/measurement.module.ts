import { MiddlewaresConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { ForgotPasswordModule } from '../forgot-password/forgot-password.module';
import { ForgotPasswordService } from '../forgot-password/forgot-password.service';
import { UserService } from '../user/user.service';
import { MeasurementController } from './measurement.controller';
import { MeasurementSerializer } from './measurement.serializer';
import { MeasurementService } from './measurement.service';

@Module({
  components: [
    UserService,
    DatabaseConfig,
    DatabaseService,
    ForgotPasswordService,
    EmailService,
    MeasurementSerializer,
    MeasurementService,
  ],
  controllers: [MeasurementController],
  modules: [DatabaseModule, ForgotPasswordModule, EmailModule],
})
export class MeasurementModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MeasurementController);
  }
}
