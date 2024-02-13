import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
