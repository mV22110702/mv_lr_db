import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ZooAnimal } from './animal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalService {
  public constructor(
    @InjectRepository(ZooAnimal)
    private readonly animalRepository: Repository<ZooAnimal>,
  ) {}
  public async findAll(): Promise<ZooAnimal[]> {
    return this.animalRepository.find();
  }

  public async findOne(id: number): Promise<ZooAnimal> {
    return this.animalRepository.findOne({ where: { id } });
  }

  public async create(animal: CreateAnimalDto): Promise<ZooAnimal> {
    return this.animalRepository.save(animal);
  }

  public async update(id: number, animal: UpdateAnimalDto): Promise<ZooAnimal> {
    await this.animalRepository.update(id, animal);
    return this.animalRepository.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
}
