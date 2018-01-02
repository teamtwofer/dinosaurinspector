import { Column, Entity, ManyToOne } from 'typeorm';
import {
  IAddMeasurement,
  IMeasurement,
  MeasurementType,
} from '../../types/measurement';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Measurement extends Base implements IMeasurement {
  static async from(
    measurement: IAddMeasurement,
    user: User
  ): Promise<Measurement> {
    return new Measurement(
      measurement.value,
      measurement.type,
      new Date(measurement.measuredAt),
      user
    );
  }

  static async fromUpdate(
    { value, type, measuredAt }: IAddMeasurement,
    oldMeasurement: Measurement
  ): Promise<Measurement> {
    return { value, type, measuredAt: new Date(measuredAt), ...oldMeasurement };
  }

  @Column() value: number;
  @Column('int') type: MeasurementType;
  @Column('date') measuredAt: Date;

  @ManyToOne(_ => User, u => u.measurements, {
    cascadeAll: true,
  })
  user: User;

  constructor(
    value: number,
    type: MeasurementType,
    measuredAt: Date,
    user: User
  ) {
    super();
    this.value = value;
    this.type = type;
    this.measuredAt = measuredAt;
    this.user = user;
  }
}
