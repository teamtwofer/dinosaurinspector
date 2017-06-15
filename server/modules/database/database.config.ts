import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { User } from '../../entities/user.entity';

@Component()
export class DatabaseConfig {
  getConfiguration(): ConnectionOptions {
    return {
      autoSchemaSync: true,
      driver: {
        database: 'dinosaur_development',
        host: 'localhost',
        password: 'potato',
        port: 5432,
        type: 'postgres',
        username: 'bbayard',
      },
      entities: [User],
      logging: {
        logFailedQueryError: true,
        logQueries: true,
      },
      type: 'postgres',
    };
  }
}
