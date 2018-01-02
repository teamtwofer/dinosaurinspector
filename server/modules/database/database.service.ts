import { Component } from '@nestjs/common';
import {
  Connection,
  createConnection,
  EntityManager,
  ObjectType,
  Repository,
} from 'typeorm';

import { DatabaseConfig } from './database.config';

@Component()
export class DatabaseService {
  private _connection: Connection | null = null;

  constructor(private readonly databaseConfig: DatabaseConfig) {}

  get connection(): Promise<Connection> {
    if (this._connection) {
      return Promise.resolve(this._connection);
    }
    return createConnection(this.databaseConfig.getConfiguration())
      .then(connection => {
        console.info(this.databaseConfig.getConfiguration());
        this._connection = connection;
        return connection;
      })
      .catch(e => {
        // tslint:disable:no-console
        console.log('There was an error connecting to the database');
        console.log(e.message);
        console.info(this.databaseConfig.getConfiguration());
        // tslint:enable:no-console
        throw e;
      });
  }

  async getEntityManager(): Promise<EntityManager> {
    return (await this.connection).manager;
  }

  async getRepository<T>(
    entityClassOrName: ObjectType<T> | string
  ): Promise<Repository<T>> {
    return (await this.connection).getRepository<T>(entityClassOrName);
  }
}
