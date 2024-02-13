import { Module } from '@nestjs/common';
import { KeeperController } from './keeper.controller';
import { KeeperService } from './keeper.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZooKeeper } from './keeper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZooKeeper])],
  controllers: [KeeperController],
  providers: [KeeperService],
  exports: [KeeperService],
})
export class KeeperModule {}
