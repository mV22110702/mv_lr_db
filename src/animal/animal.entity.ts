import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ZooShift } from '../shift/shift.entity';

@Entity({ name: 'zoo_animals' })
export class ZooAnimal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'scientific_name', type: 'varchar', length: 200 })
  scientificName: string;
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @OneToMany(() => ZooShift, (shift) => shift.animal)
  shifts: ZooShift[];
}
