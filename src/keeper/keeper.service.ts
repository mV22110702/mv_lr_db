import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  public async getShiftsCountByKeeperId(id: number): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sql = require('mssql');
    await sql.connect({
      password: '12345678',
      user: 'sa',
      server: 'localhost',
      database: 'LR1_MV22110702',
      options: { encrypt: false },
      port: 49623,
    });

    const request = new sql.Request();
    request.input('keeperId', sql.Int, id);
    request.output('shiftsCount', sql.Int, 0);
    const res = await request.execute('countShiftsByKeeper');
    return res.output;
  }

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
    return this.findOne(res.identifiers[0].id);
  }

  public async update(
    id: number,
    updateKeeperDto: UpdateKeeperDto,
  ): Promise<ZooKeeper> {
    const candidate = await this.findOne(id);
    if (!candidate) {
      throw new HttpException('Keeper not found', HttpStatus.BAD_REQUEST);
    }
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
    if (!candidate) {
      return null;
    }
    await this.keeperRepository
      .createQueryBuilder()
      .delete()
      .from(ZooKeeper)
      .where('id = :id', { id })
      .execute();
    return candidate;
  }
}
