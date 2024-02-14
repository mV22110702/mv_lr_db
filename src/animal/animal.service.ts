import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ZooAnimal } from './animal.entity';
import { Repository } from 'typeorm';
import { ZooKeeper } from '../keeper/keeper.entity';
import { CreateKeeperDto } from '../keeper/dto/create-keeper.dto';
import { UpdateKeeperDto } from '../keeper/dto/update-keeper.dto';

@Injectable()
export class AnimalService {
  public constructor(
    @InjectRepository(ZooAnimal)
    private readonly animalRepository: Repository<ZooAnimal>,
  ) {}
  public async findAll(): Promise<ZooAnimal[]> {
    return this.animalRepository
      .createQueryBuilder('animal')
      .select()
      .getMany();
  }

  public async findOne(id: number): Promise<ZooAnimal> {
    return this.animalRepository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async create(animalDto: CreateAnimalDto): Promise<ZooAnimal> {
    const res = await this.animalRepository
      .createQueryBuilder()
      .insert()
      .values(animalDto)
      .execute();
    return this.findOne(res.identifiers[0].id);
  }

  public async update(
    id: number,
    updateAnimalDto: UpdateAnimalDto,
  ): Promise<ZooAnimal> {
    const candidate = await this.findOne(id);
    if (!candidate) {
      throw new HttpException('Animal not found', HttpStatus.BAD_REQUEST);
    }
    await this.animalRepository
      .createQueryBuilder()
      .update()
      .set(updateAnimalDto)
      .where('id = :id', { id })
      .execute();
    return this.findOne(id);
  }

  public async remove(id: number): Promise<ZooAnimal> {
    const candidate = await this.findOne(id);
    if (!candidate) {
      return null;
    }
    await this.animalRepository
      .createQueryBuilder()
      .delete()
      .from(ZooAnimal)
      .where('id = :id', { id })
      .execute();
    return candidate;
  }
}
