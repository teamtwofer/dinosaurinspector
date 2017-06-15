import { Module } from '@nestjs/common';
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
export class UserModule {}
