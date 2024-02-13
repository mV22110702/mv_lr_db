import { IsNumber, Min } from 'class-validator';
import { CreateShiftDto } from './create-shift.dto';
import { PickType } from '@nestjs/swagger';

export class FindShiftDto extends PickType(CreateShiftDto, [
  'animalId',
  'keeperId',
]) {}
