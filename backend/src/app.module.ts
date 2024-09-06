import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [UserModule, DatabaseModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
