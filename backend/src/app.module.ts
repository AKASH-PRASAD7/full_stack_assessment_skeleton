import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { HomeModule } from './modules/home/home.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Home } from './modules/home/entities/home.entity';
import { UserHomeRelation } from './modules/user/entities/user.home.entity';

@Module({
  imports: [
    UserModule,
    HomeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 8000,
      username: 'db_user',
      password: '6equj5_db_user',
      database: 'home_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
