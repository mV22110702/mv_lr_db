import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZooShift } from './shift.entity';
import { ShiftController } from './shift.controller';
import { AnimalModule } from '../animal/animal.module';
import { KeeperModule } from '../keeper/keeper.module';

@Module({
  imports: [TypeOrmModule.forFeature([ZooShift]), AnimalModule, KeeperModule],
  providers: [ShiftService],
  exports: [ShiftService],
  controllers: [ShiftController],
})
export class ShiftModule {}
