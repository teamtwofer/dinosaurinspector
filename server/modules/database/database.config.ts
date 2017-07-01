import { Component } from '@nestjs/common';
import { ConnectionOptions } from 'typeorm';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { User } from '../../entities/user.entity';

@Component()
export class DatabaseConfig {
  getConfiguration(): ConnectionOptions {
    const { env } = process;
    const isTesting = env.NODE_ENV === 'test';
    const isProduction = env.NODE_ENV === 'production';
    return {
      autoSchemaSync: true,
      driver: {
        database: isTesting ? 'dinosaur_testing' : 'dinosaur_development',
        host: process.env.DATABASE_URL || 'localhost',
        password: isProduction ? undefined : 'potato',
        port: isProduction ? undefined : 5432,
        type: 'postgres',
        username: isProduction ? undefined : 'bbayard',
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
