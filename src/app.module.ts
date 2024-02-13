import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeeperModule } from './keeper/keeper.module';
import { ZooKeeper } from './keeper/keeper.entity';
import { AnimalModule } from './animal/animal.module';
import { ShiftModule } from './shift/shift.module';
import { ZooAnimal } from './animal/animal.entity';
import { ZooShift } from './shift/shift.entity';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log({
          type: 'mssql',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get<number>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [ZooKeeper, ZooAnimal, ZooShift],
          synchronize: false,
          logging: true,
          options: {
            encrypt: false,
          },
        });
        return {
          type: 'mssql',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get<number>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [ZooKeeper, ZooAnimal, ZooShift],
          synchronize: false,
          autoLoadEntities: true,
          options: {
            encrypt: false,
          },
        };
      },
      inject: [ConfigService],
    }),
    KeeperModule,
    AnimalModule,
    ShiftModule,
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
