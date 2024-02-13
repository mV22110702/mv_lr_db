import { CreateShiftDto } from './create-shift.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateShiftDto extends PartialType(
  OmitType(CreateShiftDto, ['keeperId', 'animalId']),
) {}
