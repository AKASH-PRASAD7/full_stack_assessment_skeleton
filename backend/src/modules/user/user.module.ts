import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UserService, DatabaseModule],
  controllers: [UserController],
})
export class UserModule {}
