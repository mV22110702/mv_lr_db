import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZooShift } from './shift.entity';
import { Repository } from 'typeorm';
import { FindShiftDto } from './dto/find-shift.dto';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { KeeperService } from '../keeper/keeper.service';
import { AnimalService } from '../animal/animal.service';

@Injectable()
export class ShiftService {
  public constructor(
    @InjectRepository(ZooShift)
    private readonly shiftRepository: Repository<ZooShift>,
    private readonly animalService: AnimalService,
    private readonly keeperService: KeeperService,
  ) {}

  public async findAll(): Promise<ZooShift[]> {
    return this.shiftRepository.find({
      relations: { animal: true, keeper: true },
    });
  }

  public async findOne({
    animalId,
    keeperId,
  }: FindShiftDto): Promise<ZooShift> {
    return this.shiftRepository
      .createQueryBuilder('shift')
      .select()
      .leftJoinAndSelect('shift.animal', 'animal')
      .leftJoinAndSelect('shift.keeper', 'keeper')
      .where('shift.animal.id = :animalId', { animalId })
      .andWhere('shift.keeper.id = :keeperId', { keeperId })
      .getOne();
  }

  public async create(shift: CreateShiftDto): Promise<ZooShift> {
    const animal = await this.animalService.findOne(shift.animalId);
    if (!animal)
      throw new HttpException('Animal not found', HttpStatus.BAD_REQUEST);
    const keeper = await this.keeperService.findOne(shift.keeperId);
    if (!keeper)
      throw new HttpException('Keeper not found', HttpStatus.BAD_REQUEST);
    const res = await this.shiftRepository
      .createQueryBuilder()
      .insert()
      .values({
        animal,
        keeper,
        salary: shift.salary,
        startsAt: shift.startsAt,
        endsAt: shift.endsAt,
      })
      .execute();
    return this.findOne({ keeperId: shift.keeperId, animalId: shift.animalId });
  }

  public async update(
    { animalId, keeperId }: FindShiftDto,
    shift: UpdateShiftDto,
  ): Promise<ZooShift> {
    const shiftToUpdate = await this.findOne({ animalId, keeperId });
    if (!shiftToUpdate)
      throw new HttpException('Shift not found', HttpStatus.BAD_REQUEST);
    Object.keys(shiftToUpdate).forEach(
      (k) => (shiftToUpdate[k] = shift[k] || shiftToUpdate[k]),
    );
    await this.shiftRepository.save(shiftToUpdate);
    return this.findOne({ animalId, keeperId });
  }

  public async remove({ animalId, keeperId }: FindShiftDto): Promise<ZooShift> {
    const shiftToUpdate = await this.findOne({ animalId, keeperId });
    const copy = { ...shiftToUpdate };
    await this.shiftRepository.remove(shiftToUpdate);
    return copy;
  }
}
