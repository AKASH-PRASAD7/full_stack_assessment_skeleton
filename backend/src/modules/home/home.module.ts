import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { User } from '../user/entities/user.entity';
import { UserHomeRelation } from '../user/entities/user.home.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home, User, UserHomeRelation])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
