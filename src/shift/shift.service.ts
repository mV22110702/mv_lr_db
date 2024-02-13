import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZooShift } from './shift.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShiftService {
  public constructor(
    @InjectRepository(ZooShift)
    private readonly shiftRepository: Repository<ZooShift>,
  ) {}

  public async findAll(): Promise<ZooShift[]> {
    return this.shiftRepository.find();
  }

  public async findOne(id: number): Promise<ZooShift> {
    return this.shiftRepository.findOne({ where: { id } });
  }

  public async create(shift: CreateshiftDto): Promise<ZooShift> {
    return this.shiftRepository.save(shift);
  }

  public async update(id: number, shift: UpdateshiftDto): Promise<ZooShift> {
    await this.shiftRepository.update(id, shift);
    return this.shiftRepository.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<void> {
    await this.shiftRepository.delete(id);
  }
}
