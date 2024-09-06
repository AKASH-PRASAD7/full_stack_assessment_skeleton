import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserHomeRelation } from './user.home.entity';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany(
    () => UserHomeRelation,
    (userHomeRelation) => userHomeRelation.user,
  )
  homes: UserHomeRelation[];
}
