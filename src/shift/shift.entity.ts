import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ZooAnimal } from '../animal/animal.entity';
import { JoinColumn } from 'typeorm/browser';
import { ZooKeeper } from '../keeper/keeper.entity';
@Entity({ name: 'zoo_shifts' })
@Check('start_end_shift_time_check', `"starts_at" < "ends_at"`)
export class ZooShift {
  @PrimaryColumn({ type: 'int', name: 'animal_id' })
  @ManyToOne(() => ZooAnimal, (animal) => animal.shifts, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animal_id' })
  animal: ZooAnimal;

  @PrimaryColumn({ type: 'int', name: 'keeper_id' })
  @ManyToOne(() => ZooKeeper, (keeper) => keeper.shifts, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keeper_id' })
  keeper: ZooKeeper;

  @Column({ type: 'datetime', name: 'starts_at' })
  startsAt: Date;

  @Column({ type: 'datetime', name: 'ends_at' })
  endsAt: Date;

  @Column({ type: 'real' })
  salary: number;
}
