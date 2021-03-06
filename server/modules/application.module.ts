import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  modules: [UserModule],
})
export class ApplicationModule {}
