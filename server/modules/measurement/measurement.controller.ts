import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UsePipes,
} from '@nestjs/common';
import * as express from 'express';

import { Measurement } from '../../entities/measurement.entity';
import { NewMeasurementValidator } from '../../validators/measurement.validator';
import { ValidatorPipe } from '../pipes/validator.pipe';
import { MeasurementSerializer } from './measurement.serializer';
import { MeasurementService } from './measurement.service';

@Controller('measurements')
export class MeasurementController {
  constructor(
    public service: MeasurementService,
    public serializer: MeasurementSerializer
  ) {}

  @Get()
  async getMeasurements(
    @Request() req: any,
    @Response() res: express.Response
  ) {
    const measurements = await this.service.getAll(req.user);
    res
      .status(HttpStatus.OK)
      .json(measurements.map(this.serializer.serializeFull));
  }

  @Post()
  @UsePipes(new ValidatorPipe())
  async addMeasurement(
    @Response() res: express.Response,
    @Request() req: any,
    @Body('measurement') measurementToAdd: NewMeasurementValidator
  ) {
    try {
      const measurement = await this.service.add({
        ...measurementToAdd,
        userId: req.user.id,
      });
      res
        .status(HttpStatus.CREATED)
        .json(this.serializer.serializeFull(measurement));
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  @Patch(':id')
  @UsePipes(new ValidatorPipe())
  async updateMeasurement(
    @Response() res: express.Response,
    @Body('measurement') measurementToUpdate: NewMeasurementValidator,
    @Param('id') id: number
  ) {
    const measurement = await this.service.get(id);
    if (!measurement) {
      throw new NotFoundException();
    }

    try {
      const updatedMeasurement = await this.service.update(
        await Measurement.fromUpdate(measurementToUpdate, measurement)
      );
      res
        .status(HttpStatus.CREATED)
        .json(this.serializer.serializeFull(updatedMeasurement));
    } catch (_error) {
      throw new NotAcceptableException();
    }
  }

  @Delete(':id')
  async deleteMeasurement(
    @Request() _req: any,
    @Response() res: express.Response,
    @Param() id: number
  ) {
    const measurement = await this.service.get(id);
    if (!measurement) {
      throw new NotFoundException();
    }
    const deletedMeasurement = await this.service.remove(measurement);
    res
      .status(HttpStatus.OK)
      .json(this.serializer.serializeFull(deletedMeasurement));
  }
}
