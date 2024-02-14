import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedHistory } from './feed-history.entity';
import { Repository } from 'typeorm';
import { ZooShift } from '../shift/shift.entity';
import { FindShiftDto } from '../shift/dto/find-shift.dto';
import { CreateShiftDto } from '../shift/dto/create-shift.dto';
import { UpdateShiftDto } from '../shift/dto/update-shift.dto';
import { FindFeedHistoryDto } from './dto/find-feed-history.dto';
import { CreateFeedHistoryDto } from './dto/create-feed-history.dto';
import { AnimalService } from '../animal/animal.service';
import { KeeperService } from '../keeper/keeper.service';
import { FoodService } from '../food/food.service';
import { UpdateFeedHistoryDto } from './dto/update-feed-history.dto';

@Injectable()
export class FeedHistoryService {
  public constructor(
    @InjectRepository(FeedHistory)
    private readonly feedHistoryRepository: Repository<FeedHistory>,
    private readonly animalService: AnimalService,
    private readonly keeperService: KeeperService,
    private readonly foodService: FoodService,
  ) {}

  public async findAll(): Promise<FeedHistory[]> {
    return this.feedHistoryRepository.find({
      relations: { animal: true, keeper: true, food: true },
    });
  }

  public async findOne({
    animalId,
    keeperId,
    createdAt,
  }: FindFeedHistoryDto): Promise<FeedHistory> {
    return this.feedHistoryRepository
      .createQueryBuilder('history')
      .select()
      .leftJoinAndSelect('history.animal', 'animal')
      .leftJoinAndSelect('history.keeper', 'keeper')
      .where('history.animal.id = :animalId', { animalId })
      .andWhere('history.keeper.id = :keeperId', { keeperId })
      .andWhere('history.createdAt = :createdAt', { createdAt })
      .getOne();
  }

  public async create(
    feedHistoryDto: CreateFeedHistoryDto,
  ): Promise<FeedHistory> {
    const animal = await this.animalService.findOne(feedHistoryDto.animalId);
    if (!animal)
      throw new HttpException('Animal not found', HttpStatus.BAD_REQUEST);
    const keeper = await this.keeperService.findOne(feedHistoryDto.keeperId);
    if (!keeper)
      throw new HttpException('Keeper not found', HttpStatus.BAD_REQUEST);
    const food = await this.foodService.findOne(feedHistoryDto.foodId);
    if (!food)
      throw new HttpException('Food not found', HttpStatus.BAD_REQUEST);

    const res = await this.feedHistoryRepository
      .createQueryBuilder()
      .insert()
      .values({
        animal,
        keeper,
        food,
        createdAt: feedHistoryDto.createdAt,
        amount: feedHistoryDto.amount,
      })
      .execute();
    return this.findOne({
      keeperId: feedHistoryDto.keeperId,
      animalId: feedHistoryDto.animalId,
      createdAt: feedHistoryDto.createdAt,
    });
  }

  public async update(
    { animalId, keeperId, createdAt }: FindFeedHistoryDto,
    feedHistoryDto: UpdateFeedHistoryDto,
  ): Promise<FeedHistory> {
    const feedHistoryToUpdate = await this.findOne({
      animalId,
      keeperId,
      createdAt,
    });
    if (!feedHistoryToUpdate)
      throw new HttpException('Feed history not found', HttpStatus.BAD_REQUEST);
    Object.keys(feedHistoryToUpdate).forEach(
      (k) =>
        (feedHistoryToUpdate[k] = feedHistoryDto[k] || feedHistoryToUpdate[k]),
    );
    await this.feedHistoryRepository.save(feedHistoryToUpdate);
    return this.findOne({ animalId, keeperId, createdAt });
  }

  public async remove({
    animalId,
    keeperId,
    createdAt,
  }: FindFeedHistoryDto): Promise<FeedHistory> {
    const feedHistoryToDelete = await this.findOne({
      animalId,
      keeperId,
      createdAt,
    });
    const copy = { ...feedHistoryToDelete };
    await this.feedHistoryRepository.remove(feedHistoryToDelete);
    return copy;
  }
}
