import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZooShift } from './shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZooShift])],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
