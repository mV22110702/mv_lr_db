import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateFeedHistoryDto {
  @IsNumber({}, { message: 'Keeper ID must be a number' })
  @Min(1, { message: 'Keeper ID must be greater than 0' })
  @IsNotEmpty({ message: 'Keeper ID is required' })
  readonly keeperId: number;

  @IsNumber({}, { message: 'Animal ID must be a number' })
  @Min(1, { message: 'Animal ID must be greater than 0' })
  @IsNotEmpty({ message: 'Animal ID is required' })
  readonly animalId: number;

  @IsDateString({}, { message: 'Creation date must be a valid date' })
  @IsNotEmpty({ message: 'Creation date is required' })
  readonly createdAt: Date;

  @IsNumber({}, { message: 'Food ID must be a number' })
  @Min(1, { message: 'Food ID must be greater than 0' })
  @IsNotEmpty({ message: 'Food ID is required' })
  readonly foodId: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  @Min(0, { message: 'Amount must be greater than 0' })
  @IsNotEmpty({ message: 'Amount is required' })
  readonly amount: number;
}
