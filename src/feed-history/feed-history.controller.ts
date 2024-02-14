import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShiftDto } from '../shift/dto/create-shift.dto';
import { UpdateShiftDto } from '../shift/dto/update-shift.dto';
import { FeedHistoryService } from './feed-history.service';
import { CreateFeedHistoryDto } from './dto/create-feed-history.dto';
import { UpdateFeedHistoryDto } from './dto/update-feed-history.dto';
import { FindFeedHistoryDto } from './dto/find-feed-history.dto';

@Controller('feed-history')
export class FeedHistoryController {
  public constructor(private readonly feedHistoryService: FeedHistoryService) {}
  @Post('/one')
  create(@Body() createFeedHistoryDto: CreateFeedHistoryDto) {
    return this.feedHistoryService.create(createFeedHistoryDto);
  }
  @Get('/all')
  findAll() {
    return this.feedHistoryService.findAll();
  }
  @Get('/one')
  findOne(@Body() findFeedHistoryDto: FindFeedHistoryDto) {
    return this.feedHistoryService.findOne(findFeedHistoryDto);
  }
  @Patch('/one')
  update(
    @Body()
    {
      animalId,
      keeperId,
      createdAt,
      ...updateFeedHistoryDto
    }: UpdateFeedHistoryDto,
  ) {
    return this.feedHistoryService.update(
      { animalId, keeperId, createdAt },
      updateFeedHistoryDto,
    );
  }
  @Delete('/one')
  remove(@Body() findFeedHistoryDto: FindFeedHistoryDto) {
    return this.feedHistoryService.remove(findFeedHistoryDto);
  }
}
