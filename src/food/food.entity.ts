import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeedHistory } from '../feed-history/feed-history.entity';

@Entity({ name: 'food' })
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ name: 'restocked_at', type: 'datetime' })
  restockedAt: Date;

  @Column({ name: 'used_at', type: 'datetime', nullable: true })
  usedAt: Date;

  @OneToMany((type) => FeedHistory, (history) => history.food, {
    cascade: true,
  })
  feedHistories: FeedHistory[];
}
