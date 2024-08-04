import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('simple-array', { nullable: true })
  collaborate: number[];

  @Column({ nullable: true })
  login_time: number;
}