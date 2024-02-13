import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { FoodController } from './food.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  providers: [FoodService],
  exports: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
