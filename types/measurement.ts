import { IUser } from './user';

export interface IMeasurement {
  id: number;
  value: number;
  type: MeasurementType;
  user: IUser | null;
  measuredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddMeasurement {
  value: number;
  type: MeasurementType;
  measuredAt: string;
}

export interface INewMeasurement extends IAddMeasurement {
  userId: number;
}

export enum MeasurementType {
  BodyFat,
  Bust,
  Chest,
  Waist,
  Hips,
  Midway,
  Thighs,
  Knees,
  Calves,
  UpperArm,
  Forearms,
}
