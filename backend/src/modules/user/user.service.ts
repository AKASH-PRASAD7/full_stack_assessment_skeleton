import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHomeRelation } from './entities/user.home.entity';

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserHomeRelation)
    private readonly userHomeRelationRepository: Repository<UserHomeRelation>,
  ) {}

  async findAll(): Promise<ServiceResponse<User[]>> {
    try {
      const users = await this.userRepository.find();
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        success: false,
        message: 'Failed to fetch users',
      };
    }
  }

  async findByHome(homeId: number): Promise<ServiceResponse<User[]>> {
    try {
      const relations = await this.userHomeRelationRepository.find({
        where: { home_id: homeId },
        relations: ['user'],
      });

      if (!relations.length) {
        throw new NotFoundException('No users found for this home!');
      }

      const users = relations.map((relation) => relation.user);

      return {
        success: true,
        data: users,
      };
    } catch (error) {
      console.error('Error fetching users for home:', error);
      return {
        success: false,
        message: 'Failed to fetch users for the home',
      };
    }
  }

  async findOne(id: number): Promise<ServiceResponse<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        console.error('Error fetching user:', error);
        return {
          success: false,
          message: 'Failed to fetch user',
        };
      }
      throw error;
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
