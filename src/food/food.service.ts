import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';
import { ZooKeeper } from '../keeper/keeper.entity';
import { CreateKeeperDto } from '../keeper/dto/create-keeper.dto';
import { UpdateKeeperDto } from '../keeper/dto/update-keeper.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  public constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}

  public async findAll(): Promise<Food[]> {
    return this.foodRepository.createQueryBuilder('food').select().getMany();
  }

  public async findOne(id: number): Promise<Food> {
    return this.foodRepository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async create(foodDto: CreateFoodDto): Promise<Food> {
    const res = await this.foodRepository
      .createQueryBuilder()
      .insert()
      .values(foodDto)
      .execute();
    console.log('SDF');
    console.log(res);
    return this.findOne(res.identifiers[0].id);
  }

  public async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    await this.foodRepository
      .createQueryBuilder()
      .update()
      .set(updateFoodDto)
      .where('id = :id', { id })
      .execute();
    return this.findOne(id);
  }

  public async remove(id: number): Promise<Food> {
    const candidate = await this.findOne(id);
    await this.foodRepository
      .createQueryBuilder()
      .delete()
      .from(Food)
      .where('id = :id', { id })
      .execute();
    return candidate;
  }
}
