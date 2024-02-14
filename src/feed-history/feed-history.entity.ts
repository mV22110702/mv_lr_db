import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZooAnimal } from '../animal/animal.entity';
import { ZooKeeper } from '../keeper/keeper.entity';
import { Food } from '../food/food.entity';

@Entity({ name: 'feed_history' })
export class FeedHistory {
  @PrimaryColumn({ type: 'int', name: 'animal_id' })
  @ManyToOne(() => ZooAnimal, (animal) => animal.feedHistories, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animal_id' })
  animal: ZooAnimal;

  @PrimaryColumn({ type: 'int', name: 'keeper_id' })
  @ManyToOne(() => ZooKeeper, (keeper) => keeper.feedHistories, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keeper_id' })
  keeper: ZooKeeper;

  @PrimaryColumn({ type: 'int', name: 'food_id' })
  @ManyToOne(() => Food, (food) => food.feedHistories, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'food_id' })
  food: Food;

  @PrimaryColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Column()
  amount: number;
}
