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
    return this.keeperRepository
      .createQueryBuilder('keeper')
      .select()
      .getMany();
  }

  public async findOne(id: number): Promise<ZooKeeper> {
    return this.keeperRepository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async create(keeperDto: CreateKeeperDto): Promise<ZooKeeper> {
    const res = await this.keeperRepository
      .createQueryBuilder()
      .insert()
      .values(keeperDto)
      .execute();
    console.log('SDF');
    console.log(res);
    return this.findOne(res.identifiers[0].id);
  }

  public async update(
    id: number,
    updateKeeperDto: UpdateKeeperDto,
  ): Promise<ZooKeeper> {
    await this.keeperRepository
      .createQueryBuilder()
      .update()
      .set(updateKeeperDto)
      .where('id = :id', { id })
      .execute();
    return this.findOne(id);
  }

  public async remove(id: number): Promise<ZooKeeper> {
    const candidate = await this.findOne(id);
    await this.keeperRepository
      .createQueryBuilder()
      .delete()
      .from(ZooKeeper)
      .where('id = :id', { id })
      .execute();
    return candidate;
  }
}
