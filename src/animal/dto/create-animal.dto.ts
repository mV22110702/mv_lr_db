import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  readonly scientificName: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
