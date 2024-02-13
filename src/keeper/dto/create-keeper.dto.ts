import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKeeperDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
