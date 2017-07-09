import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { User } from '../../entities/user.entity';
import PG = require('pg-connection-string');

@Component()
export class DatabaseConfig {
  getConfiguration(): ConnectionOptions {
    const { env } = process;
    const isTesting = env.NODE_ENV === 'test';
    const useOptions = !!process.env.DATABASE_URL;
    const options = useOptions
      ? PG.parse(process.env.DATABASE_URL)
      : {} as PG.ConnectionOptions;
    return {
      autoSchemaSync: true,
      driver: {
        database: useOptions
          ? options.database!
          : isTesting ? 'dinosaur_testing' : 'dinosaur_development',
        host: useOptions ? options.host! : 'localhost',
        password: useOptions ? options.password! : 'potato',
        port: useOptions ? options.port! : 5432,
        type: 'postgres',
        username: useOptions ? options.user! : 'bbayard',
      },
      entities: [User, ForgotPassword],
      logging: {
        logFailedQueryError: !isTesting,
        logQueries: !isTesting,
      },
      name: `${Date.now()}`,
      type: 'postgres' as any,
    };
  }
}
