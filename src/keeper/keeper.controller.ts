import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { KeeperService } from './keeper.service';
import { UpdateKeeperDto } from './dto/update-keeper.dto';
import { CreateKeeperDto } from './dto/create-keeper.dto';

@Controller('keeper')
export class KeeperController {
  constructor(private readonly keeperService: KeeperService) {}
  @Post()
  create(@Body() createKeeperDto: CreateKeeperDto) {
    return this.keeperService.create(createKeeperDto);
  }

  @Get('shifts-count/:id')
  async getShiftsCountByKeeperId(@Param('id') id: number) {
    return await this.keeperService.getShiftsCountByKeeperId(id);
  }

  @Get()
  findAll() {
    return this.keeperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keeperService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateKeeperDto: UpdateKeeperDto) {
    return this.keeperService.update(id, updateKeeperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.keeperService.remove(id);
  }
}
