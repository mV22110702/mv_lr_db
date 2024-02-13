import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateKeeperDto } from '../keeper/dto/create-keeper.dto';
import { UpdateKeeperDto } from '../keeper/dto/update-keeper.dto';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shift')
export class ShiftController {
  public constructor(private readonly shiftService: ShiftService) {}

  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':animalId/:keeperId')
  findOne(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
  ) {
    return this.shiftService.findOne({ animalId, keeperId });
  }

  @Patch(':animalId/:keeperId')
  update(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftService.update({ animalId, keeperId }, updateShiftDto);
  }

  @Delete(':animalId/:keeperId')
  remove(
    @Param('animalId') animalId: number,
    @Param('keeperId') keeperId: number,
  ) {
    return this.shiftService.remove({ animalId, keeperId });
  }
}
