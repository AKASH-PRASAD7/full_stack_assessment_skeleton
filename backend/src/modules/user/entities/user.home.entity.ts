import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Home } from '../../home/entities/home.entity';

@Entity()
export class UserHomeRelation {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  home_id: number;

  @ManyToOne(() => User, (user) => user.homes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Home, (home) => home.homeRelations)
  @JoinColumn({ name: 'home_id' })
  home: Home;
}
