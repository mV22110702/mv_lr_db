import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Amount is required' })
  @Min(0, { message: 'Amount must be greater than 0' })
  amount: number;
  @IsNotEmpty({ message: 'Restock date is required' })
  @IsDateString({}, { message: 'Restock date must be a valid date' })
  restockedAt: Date;

  @IsDate({ message: 'Last used date must be a valid date' })
  @IsOptional()
  usedAt: Date;
}
