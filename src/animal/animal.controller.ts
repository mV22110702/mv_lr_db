import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }
  @Get('/details/:id')
  getAnimalDetails(@Param('id') id: number) {
    return this.animalService.getAnimalDetails(id);
  }
  @Get()
  findAll() {
    return this.animalService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.animalService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(id, updateAnimalDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.animalService.remove(id);
  }
}
