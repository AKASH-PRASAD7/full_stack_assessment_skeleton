import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserHomeRelation } from '../../user/entities/user.home.entity';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  home_id: number;

  @Column({ nullable: true })
  street_address: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zip: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  sqft: number;

  @Column({ type: 'tinyint', nullable: true })
  beds: number;

  @Column({ type: 'tinyint', nullable: true })
  baths: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  list_price: number;

  @OneToMany(
    () => UserHomeRelation,
    (userHomeRelation) => userHomeRelation.home,
  )
  homeRelations: UserHomeRelation[];
}
