import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../database/database.config';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  components: [ForgotPasswordService, DatabaseConfig, DatabaseService],
  modules: [DatabaseModule],
})
export class ForgotPasswordModule {}
