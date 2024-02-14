import { PickType } from '@nestjs/swagger';
import { CreateFeedHistoryDto } from './create-feed-history.dto';

export class FindFeedHistoryDto extends PickType(CreateFeedHistoryDto, [
  'animalId',
  'keeperId',
  'createdAt',
]) {}
