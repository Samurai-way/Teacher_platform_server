import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { User } from './modules/auth/entities/auth.entity';
import { AuthService } from './modules/auth/service/auth.service';
import { AuthController } from './modules/auth/controller/auth.controller';
import { AuthRepository } from './modules/auth/repository/auth.repository';

const controllers = [AuthController];
const services = [AuthService];
const repositories = [AuthRepository];
const entities = [User];

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
