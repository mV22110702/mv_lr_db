import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { CreateFeedHistoryDto } from './create-feed-history.dto';
import { FindFeedHistoryDto } from './find-feed-history.dto';

export class UpdateFeedHistoryDto extends IntersectionType(
  PartialType(PickType(CreateFeedHistoryDto, ['amount', 'foodId'])),
  FindFeedHistoryDto,
) {}
