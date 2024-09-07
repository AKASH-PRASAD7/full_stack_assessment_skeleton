import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

// import { CreateUserDto } from './dto/create-user.dto';

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  findAll(): Promise<ServiceResponse<User[]>> {
    return this.userService.findAll();
  }
  @Get('find-by-home/:homeId')
  async findByHome(
    @Param('homeId', ParseIntPipe) homeId: number,
  ): Promise<ServiceResponse<User[]>> {
    return await this.userService.findByHome(homeId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceResponse<User>> {
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.userService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.userService.remove(+id);
  }
}
