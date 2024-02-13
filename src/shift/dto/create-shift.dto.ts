import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Min,
  Validate,
} from 'class-validator';
import { IsStartBeforeEnd } from '../../lib/isStartBeforeEnd';

export class CreateShiftDto {
  @IsNumber({}, { message: 'Keeper ID must be a number' })
  @Min(1, { message: 'Keeper ID must be greater than 0' })
  @IsNotEmpty({ message: 'Keeper ID is required' })
  readonly keeperId: number;
  @IsNumber({}, { message: 'Animal ID must be a number' })
  @Min(1, { message: 'Animal ID must be greater than 0' })
  @IsNotEmpty({ message: 'Keeper ID is required' })
  readonly animalId: number;

  @Validate(IsStartBeforeEnd, ['endsAt'], {
    message: 'Start date must be before end date',
  })
  @IsDateString({}, { message: 'Start date must be a valid date' })
  @IsNotEmpty({ message: 'Keeper ID is required' })
  readonly startsAt: Date;

  @IsDateString({}, { message: 'End date must be a valid date' })
  @IsNotEmpty({ message: 'Keeper ID is required' })
  readonly endsAt: Date;

  @IsNumber({}, { message: 'Salary must be a number' })
  @Min(0, { message: 'Salary must be greater than 0' })
  @IsNotEmpty({ message: 'Salary is required' })
  readonly salary: number;
}
