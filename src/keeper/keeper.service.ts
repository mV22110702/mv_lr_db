import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZooKeeper } from './keeper.entity';
import { Repository } from 'typeorm';
import { CreateKeeperDto } from './dto/create-keeper.dto';
import { UpdateKeeperDto } from './dto/update-keeper.dto';

@Injectable()
export class KeeperService {
  public constructor(
    @InjectRepository(ZooKeeper)
    private readonly keeperRepository: Repository<ZooKeeper>,
  ) {}

  public async findAll(): Promise<ZooKeeper[]> {
    return this.keeperRepository.find();
  }

  public async findOne(id: number): Promise<ZooKeeper> {
    return this.keeperRepository.findOne({ where: { id } });
  }

  public async create(keeper: CreateKeeperDto): Promise<ZooKeeper> {
    return this.keeperRepository.save(keeper);
  }

  public async update(id: number, keeper: UpdateKeeperDto): Promise<ZooKeeper> {
    await this.keeperRepository.update(id, keeper);
    return this.keeperRepository.findOne({ where: { id } });
  }

  public async remove(id: number): Promise<void> {
    await this.keeperRepository.delete(id);
  }
}
