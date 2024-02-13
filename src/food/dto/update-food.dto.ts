import { IsDateString, IsNotEmpty, Min } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateFoodDto } from './create-food.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
