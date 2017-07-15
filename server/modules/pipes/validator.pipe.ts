import {
  ArgumentMetadata,
  HttpStatus,
  Pipe,
  PipeTransform,
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { validate } from 'class-validator';

@Pipe()
export class ValidatorPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!this.toValidate(metatype)) {
      return value;
    }
    const object = Object.assign(new metatype(), value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: errors
            .map(e => Object.values(e.constraints).join(', '))
            .join(', '),
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return value;
  }

  private toValidate(metatype = null): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
