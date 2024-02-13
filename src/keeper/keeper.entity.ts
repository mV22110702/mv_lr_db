import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ZooShift } from '../shift/shift.entity';
@Entity({ name: 'zoo_keepers' })
export class ZooKeeper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 200 })
  firstName: string;
  @Column({ name: 'last_name', type: 'varchar', length: 200 })
  lastName: string;

  @OneToMany((type) => ZooShift, (shift) => shift.keeper)
  shifts: ZooShift[];
}
