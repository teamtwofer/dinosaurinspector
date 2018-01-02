import { group } from 'bucketing';
import { action, computed, observable } from 'mobx';
import { Loadable } from 'mobx-failable';
import { Service } from 'typedi/decorators/Service';
import { IMeasurement, MeasurementType } from '../../types/measurement';
import { cook, dateCooker } from '../cook';
import { get } from '../utils/api';

export class Measurement implements IMeasurement {
  static cook(rawMeasurement: any): Measurement {
    const tempMeasurement = new Measurement();
    cook(
      'Measurement',
      tempMeasurement,
      rawMeasurement,
      ['value', 'measuredAt', 'id', 'createdAt', 'type'],
      {
        createdAt: dateCooker,
        updatedAt: dateCooker,
        measuredAt: dateCooker,
      }
    );
    return tempMeasurement;
  }
  @observable id: number;
  @observable value: number;
  @observable measuredAt: Date;
  @observable createdAt: Date;
  @observable updatedAt: Date;
  @observable type: MeasurementType;
  @observable user: null;
}

// tslint:disable-next-line:max-classes-per-file
@Service()
export class MeasurementsStore {
  @observable measurements = new Loadable<Measurement[]>();

  @action.bound
  async getMeasurements() {
    const request = get('/api/measurements').then(ms =>
      ms.map(Measurement.cook)
    );
    this.measurements.accept(request);
    return request;
  }

  @computed
  get groupedMeasurements() {
    const measurements = this.measurements.successOr(null)!;
    return group(
      measurements,
      m => m.measuredAt,
      measuredAt => measuredAt.toLocaleDateString()
    );
  }
}
