import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateKeeperDto } from "./create-keeper.dto";

export class UpdateKeeperDto extends PartialType(CreateKeeperDto) {}
