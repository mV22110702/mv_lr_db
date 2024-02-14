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

@Controller('feed-history')
export class FeedHistoryController {
  public constructor(private readonly feedHistoryService: FeedHistoryService) {}

  @Post()
  create(@Body() createFeedHistoryDto: CreateFeedHistoryDto) {
    return this.feedHistoryService.create(createFeedHistoryDto);
  }

  @Get()
  findAll() {
    return this.feedHistoryService.findAll();
  }

  @Get(':animalId/:keeperId/:createdAt')
  findOne(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
    @Param('createdAt') createdAt: Date,
  ) {
    return this.feedHistoryService.findOne({ animalId, keeperId, createdAt });
  }

  @Patch(':animalId/:keeperId/:createdAt')
  update(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
    @Param('createdAt') createdAt: Date,
    @Body() updateFeedHistoryDto: UpdateFeedHistoryDto,
  ) {
    return this.feedHistoryService.update(
      { animalId, keeperId, createdAt },
      updateFeedHistoryDto,
    );
  }

  @Delete(':animalId/:keeperId/:createdAt')
  remove(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
    @Param('createdAt') createdAt: Date,
  ) {
    return this.feedHistoryService.remove({ animalId, keeperId, createdAt });
  }
}
