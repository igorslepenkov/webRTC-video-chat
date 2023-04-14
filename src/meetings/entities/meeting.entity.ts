import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;
}
