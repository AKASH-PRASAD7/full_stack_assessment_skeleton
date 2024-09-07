import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Home } from './entities/home.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHomeRelation } from '../user/entities/user.home.entity';

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  total?: number;
}

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserHomeRelation)
    private readonly userHomeRelationRepository: Repository<UserHomeRelation>,
  ) {}

  async findAll(): Promise<ServiceResponse<Home[]>> {
    try {
      const homes = await this.homeRepository.find();
      return {
        success: true,
        data: homes,
      };
    } catch (error) {
      console.error('Error fetching homes:', error);
      return {
        success: false,
        message: 'Failed to fetch homes',
      };
    }
  }
  async findOne(id: number): Promise<ServiceResponse<Home>> {
    try {
      const home = await this.homeRepository.findOne({
        where: {
          home_id: id,
        },
      });

      if (!home) {
        throw new NotFoundException('Home not found!');
      }

      return {
        success: true,
        data: home,
      };
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        console.error('Error fetching home:', error);
        return {
          success: false,
          message: 'Failed to fetch home',
        };
      }
      throw error;
    }
  }

  async findByUser(
    userId: number,
    page: number = 1,
    limit: number = 50,
  ): Promise<ServiceResponse<Home[]>> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      // Fetch homes with complete details related to the user using QueryBuilder
      const [homes, total] = await this.homeRepository
        .createQueryBuilder('home')
        .innerJoin('home.homeRelations', 'userHomeRelation')
        .where('userHomeRelation.user_id = :userId', { userId })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        success: true,
        data: homes,
        total,
      };
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        console.error('Error fetching home:', error);
        return {
          success: false,
          message: 'Failed to fetch home',
        };
      }
      throw error;
    }
  }

  async updateUsers(
    homeId: number,
    userIds: number[],
  ): Promise<ServiceResponse<void>> {
    try {
      // Validate if the home exists
      const home = await this.homeRepository.findOne({
        where: { home_id: homeId },
      });
      if (!home) {
        throw new NotFoundException('Home not found!');
      }

      // Validate if all users exist
      const users = await this.userRepository.findByIds(userIds);
      if (users.length !== userIds.length) {
        throw new BadRequestException('Some users were not found!');
      }

      // Delete existing relations for the home
      await this.userHomeRelationRepository.delete({ home_id: homeId });

      // Create new relations for the provided users
      const newRelations = userIds.map((userId) => {
        const relation = new UserHomeRelation();
        relation.user_id = userId;
        relation.home_id = homeId;
        return relation;
      });

      // Save new relations
      await this.userHomeRelationRepository.save(newRelations);

      return {
        success: true,
        message: 'Users updated successfully for the home.',
      };
    } catch (error) {
      console.error('Error updating users for home:', error);
      return {
        success: false,
        message: 'Failed to update users for the home',
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
