import { Component } from '@nestjs/common';
import { IMeasurement } from '../../../types/Measurement';
import { Measurement } from '../../entities/measurement.entity';

@Component()
export class MeasurementSerializer {
  serializeFull({
    value,
    id,
    type,
    createdAt,
    updatedAt,
    measuredAt,
  }: Measurement): IMeasurement {
    return {
      value,
      id,
      type,
      createdAt,
      measuredAt,
      updatedAt: updatedAt || null,
      user: null,
    };
  }
}
