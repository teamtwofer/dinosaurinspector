import { Component } from '@nestjs/common';
import PG = require('pg-connection-string');
import { ConnectionOptions } from 'typeorm';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { Measurement } from '../../entities/measurement.entity';
import { User } from '../../entities/user.entity';

@Component()
export class DatabaseConfig {
  getConfiguration(): ConnectionOptions {
    const { env } = process;
    const isTesting = env.NODE_ENV === 'test';
    const useOptions = !!process.env.DATABASE_URL;
    const options = useOptions
      ? PG.parse(process.env.DATABASE_URL!)
      : ({} as PG.ConnectionOptions);

    return {
      synchronize: true,
      database: useOptions
        ? options.database!
        : isTesting ? 'dinosaur_test' : 'dinosaur_development',
      host: useOptions ? options.host! : 'db',
      password: useOptions ? options.password! : 'potato',
      port: useOptions ? options.port! : 5432,
      type: 'postgres',
      username: useOptions ? options.user! : 'bbayard',
      entities: [User, ForgotPassword, Measurement],
      logging: isTesting ? ['error'] : 'all',
      name: `${Date.now()}`,
    };
  }
}
