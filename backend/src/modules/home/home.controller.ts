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
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home } from './entities/home.entity';

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post('update-users')
  async updateUsers(
    @Body() updateUsersDto: { homeId: number; userIds: number[] },
  ): Promise<ServiceResponse<void>> {
    const { homeId, userIds } = updateUsersDto;
    return await this.homeService.updateUsers(homeId, userIds);
  }

  @Get()
  findAll(): Promise<ServiceResponse<Home[]>> {
    return this.homeService.findAll();
  }

  @Get('find-by-user/:userId')
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<ServiceResponse<Home[]>> {
    return await this.homeService.findByUser(userId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ServiceResponse<Home>> {
    const homeId = parseInt(id, 10);

    if (isNaN(homeId)) {
      throw new BadRequestException('Invalid home ID');
    }

    return this.homeService.findOne(homeId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeService.remove(+id);
  }
}
