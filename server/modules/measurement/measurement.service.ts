import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { autobind } from 'core-decorators';
import { Repository } from 'typeorm';
import { ICrud } from '../../../types/crud';
import { INewMeasurement } from '../../../types/measurement';
import { Measurement } from '../../entities/measurement.entity';
import { User } from '../../entities/user.entity';
import { DatabaseService } from '../database/database.service';
import { UserService } from '../user/user.service';

@Component()
export class MeasurementService
  implements ICrud<Measurement, INewMeasurement, User> {
  constructor(
    public databaseService: DatabaseService,
    public userService: UserService
  ) {}

  private get repository(): Promise<Repository<Measurement>> {
    return this.databaseService.getRepository(Measurement);
  }

  @autobind
  async add({ userId, ...measurementToAdd }: INewMeasurement) {
    const user = await this.userService.get(userId);

    if (!user) {
      throw new HttpException('Not Found', 404);
    }

    const measurement = await Measurement.from(measurementToAdd, user);
    return (await this.repository).save(measurement);
  }

  @autobind
  async addAll(...measurements: Measurement[]) {
    return (await this.repository).save(measurements);
  }

  @autobind
  async getAll(user: User, measuredAt?: Date) {
    let query: Partial<Record<keyof Measurement | 'userId', any>> = {
      user: user.id,
    };
    if (measuredAt) {
      query = Object.assign({}, query, { measuredAt });
    }
    return (await this.repository).find(query);
  }

  @autobind
  async get(id: number) {
    return (await this.repository).findOneById(id);
  }

  @autobind
  async update(measurement: Measurement) {
    return (await this.repository).save(measurement);
  }

  @autobind
  async remove(measurement: Measurement) {
    return (await this.repository).remove(measurement);
  }
}
