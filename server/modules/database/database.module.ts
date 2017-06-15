import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database.config';
import { DatabaseService } from './database.service';

@Module({
  components: [DatabaseService, DatabaseConfig],
  exports: [DatabaseService],
})
export class DatabaseModule {}
