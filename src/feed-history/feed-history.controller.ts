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
import { FilterFeedHistoryDto } from './dto/filter-feed-history.dto';
import { formatInTimeZone } from 'date-fns-tz';

@Controller('feed-history')
export class FeedHistoryController {
  public constructor(private readonly feedHistoryService: FeedHistoryService) {}
  @Post('/one')
  create(@Body() createFeedHistoryDto: CreateFeedHistoryDto) {
    return this.feedHistoryService.create({
      ...createFeedHistoryDto,
      createdAt: formatInTimeZone(
        new Date(createFeedHistoryDto.createdAt),
        'Europe/Kyiv',
        'yyyy-MM-dd HH:mm:ss.SSS',
      ),
    });
  }
  @Post('/all/find')
  findAll(@Body() filterFeedHistoryDto: FilterFeedHistoryDto) {
    return this.feedHistoryService.findAll({
      ...filterFeedHistoryDto,
      createdAt: filterFeedHistoryDto.createdAt
        ? formatInTimeZone(
            new Date(filterFeedHistoryDto.createdAt),
            'Europe/Kyiv',
            'yyyy-MM-dd HH:mm:ss.SSS',
          )
        : filterFeedHistoryDto.createdAt,
    });
  }
  @Post('/one/find')
  findOne(@Body() findFeedHistoryDto: FindFeedHistoryDto) {
    return this.feedHistoryService.findOne({
      ...findFeedHistoryDto,
      createdAt: formatInTimeZone(
        new Date(findFeedHistoryDto.createdAt),
        'Europe/Kyiv',
        'yyyy-MM-dd HH:mm:ss.SSS',
      ),
    });
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
    console.log({
      animalId,
      keeperId,
      createdAt: formatInTimeZone(
        new Date(createdAt),
        'Europe/Kyiv',
        'yyyy-MM-dd HH:mm:ss.SSS',
      ),
      ...updateFeedHistoryDto,
    });
    return this.feedHistoryService.update(
      {
        animalId,
        keeperId,
        createdAt: formatInTimeZone(
          new Date(createdAt),
          'Europe/Kyiv',
          'yyyy-MM-dd HH:mm:ss.SSS',
        ),
      },
      updateFeedHistoryDto,
    );
  }
  @Delete('/one')
  remove(@Body() findFeedHistoryDto: FindFeedHistoryDto) {
    return this.feedHistoryService.remove({
      ...findFeedHistoryDto,
      createdAt: formatInTimeZone(
        new Date(findFeedHistoryDto.createdAt),
        'Europe/Kyiv',
        'yyyy-MM-dd HH:mm:ss.SSS',
      ),
    });
  }
}
