import { Module } from '@nestjs/common';
import { FeedHistoryService } from './feed-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedHistory } from './feed-history.entity';
import { AnimalModule } from '../animal/animal.module';
import { KeeperModule } from '../keeper/keeper.module';
import { FoodModule } from '../food/food.module';
import { FeedHistoryController } from './feed-history.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedHistory]),
    AnimalModule,
    KeeperModule,
    FoodModule,
  ],
  providers: [FeedHistoryService],
  exports: [FeedHistoryService],
  controllers: [FeedHistoryController],
})
export class FeedHistoryModule {}
