import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { INewMeasurement, MeasurementType } from '../../types/measurement';

// tslint:disable:max-classes-per-file
export class NewMeasurementValidator implements INewMeasurement {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsEnum(MeasurementType) type: MeasurementType;

  @IsDateString() measuredAt: string;

  @IsOptional()
  @IsNumber()
  userId: number;
}
