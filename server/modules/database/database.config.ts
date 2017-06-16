import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { User } from '../../entities/user.entity';

@Component()
export class DatabaseConfig {
  getConfiguration(): ConnectionOptions {
    const { env } = process;
    const isTesting = env.NODE_ENV === 'test';
    return {
      autoSchemaSync: true,
      driver: {
        database: isTesting ? 'dinosaur_testing' : 'dinosaur_development',
        host: 'localhost',
        password: 'potato',
        port: 5432,
        type: 'postgres',
        username: 'bbayard',
      },
      entities: [User],
      logging: {
        logFailedQueryError: !isTesting,
        logQueries: !isTesting,
      },
      name: `${Date.now()}`,
      type: 'postgres',
    };
  }
}
