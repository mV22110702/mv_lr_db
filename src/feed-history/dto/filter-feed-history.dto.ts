import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFeedHistoryDto } from './create-feed-history.dto';

export class FilterFeedHistoryDto extends PartialType(
  PickType(CreateFeedHistoryDto, ['animalId', 'keeperId']),
) {}
