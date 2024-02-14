import { PartialType, PickType } from '@nestjs/swagger';
import { CreateFeedHistoryDto } from './create-feed-history.dto';

export class UpdateFeedHistoryDto extends PartialType(
  PickType(CreateFeedHistoryDto, ['amount', 'foodId']),
) {}
