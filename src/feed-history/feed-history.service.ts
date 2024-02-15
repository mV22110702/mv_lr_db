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
import { FilterFeedHistoryDto } from './dto/filter-feed-history.dto';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Injectable()
export class FeedHistoryService {
  public constructor(
    @InjectRepository(FeedHistory)
    private readonly feedHistoryRepository: Repository<FeedHistory>,
    private readonly animalService: AnimalService,
    private readonly keeperService: KeeperService,
    private readonly foodService: FoodService,
  ) {}

  public async findAll(
    filterFeedHistoryDto: FilterFeedHistoryDto,
  ): Promise<FeedHistory[]> {
    const baseQuery = this.feedHistoryRepository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.animal', 'animal')
      .leftJoinAndSelect('history.keeper', 'keeper')
      .leftJoinAndSelect('history.food', 'food');
    if (filterFeedHistoryDto.animalId) {
      baseQuery.andWhere('history.animal.id = :animalId', {
        animalId: filterFeedHistoryDto.animalId,
      });
    }
    if (filterFeedHistoryDto.keeperId) {
      baseQuery.andWhere('history.keeper.id = :keeperId', {
        keeperId: filterFeedHistoryDto.keeperId,
      });
    }
    return await baseQuery.getMany();
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
      .leftJoinAndSelect('history.food', 'food')
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
    const candidate = await this.findOne({
      animalId: feedHistoryDto.animalId,
      createdAt: feedHistoryDto.createdAt,
      keeperId: feedHistoryDto.keeperId,
    });

    if (candidate) {
      throw new HttpException(
        'Feed history already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.feedHistoryRepository.manager.transaction(async (manager) => {
      console.log([
        feedHistoryDto.animalId,
        feedHistoryDto.keeperId,
        feedHistoryDto.foodId,
        feedHistoryDto.createdAt,
        feedHistoryDto.amount,
      ]);
      await manager.query(
        'SET IDENTITY_INSERT feed_history ON;' +
          'INSERT INTO feed_history (animal_id, keeper_id, food_id, created_at, amount) ' +
          `VALUES (@0, @1, @2, @3, @4);` +
          'SET IDENTITY_INSERT feed_history OFF;',
        [
          feedHistoryDto.animalId,
          feedHistoryDto.keeperId,
          feedHistoryDto.foodId,
          feedHistoryDto.createdAt,
          feedHistoryDto.amount,
        ],
      );
    });
    return this.findOne({
      keeperId: feedHistoryDto.keeperId,
      animalId: feedHistoryDto.animalId,
      createdAt: feedHistoryDto.createdAt,
    });
  }

  public async update(
    { animalId, keeperId, createdAt }: FindFeedHistoryDto,
    feedHistoryDto: Pick<UpdateFeedHistoryDto, 'amount' | 'foodId'>,
  ): Promise<FeedHistory> {
    const feedHistoryToUpdate = await this.findOne({
      animalId,
      keeperId,
      createdAt,
    });
    console.log('===');
    console.log(feedHistoryToUpdate);
    if (!feedHistoryToUpdate)
      throw new HttpException('Feed history not found', HttpStatus.BAD_REQUEST);
    const food = await this.foodService.findOne(feedHistoryDto.foodId);
    if (!food)
      throw new HttpException('Food not found', HttpStatus.BAD_REQUEST);
    if (feedHistoryDto.foodId) feedHistoryToUpdate.food = food;
    Object.keys(feedHistoryToUpdate).forEach(
      (k) =>
        (feedHistoryToUpdate[k] = feedHistoryDto[k] || feedHistoryToUpdate[k]),
    );
    await this.feedHistoryRepository.save(feedHistoryToUpdate);
    return await this.findOne({ animalId, keeperId, createdAt });
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
    if (!feedHistoryToDelete) {
      return null;
    }
    const copy = { ...feedHistoryToDelete };
    await this.feedHistoryRepository.remove(feedHistoryToDelete);
    return copy;
  }
}
