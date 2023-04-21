import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  link: string;

  @Column({ unique: true })
  initiator: string;
}
