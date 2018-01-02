import { Module } from '@nestjs/common';
import { MeasurementModule } from './measurement/measurement.module';
import { UserModule } from './user/user.module';

@Module({
  modules: [UserModule, MeasurementModule],
})
export class ApplicationModule {}
