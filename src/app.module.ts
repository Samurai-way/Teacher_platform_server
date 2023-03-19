import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { User } from './auth/domain/entities/user.entity';
import { AuthService } from './auth/application/auth.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthRepository } from './auth/repository/auth.repository';
import { BanInfoEntity } from './auth/domain/entities/ban-info.entity';

const controllers = [AuthController];
const services = [AuthService];
const repositories = [AuthRepository];
const entities = [User, BanInfoEntity];

@Module({
  imports: [
    TypeOrmModule.forFeature([...entities]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.PORT),
      username: 'postgres',
      password: 'sa',
      database: 'Users',
      // entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers,
  providers: [...services, ...repositories],
})
export class AppModule {}
