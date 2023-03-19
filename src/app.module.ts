import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { UserEntity } from './auth/domain/entities/user.entity';
import { AuthService } from './auth/application/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthRepository } from './auth/repository/auth.repository';
import { BanInfoEntity } from './auth/domain/entities/ban-info.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { RegistrationUseCase } from './auth/application/use-cases/registration-use-case';

const controllers = [AuthController];
const services = [AuthService];
const repositories = [AuthRepository];
const entities = [UserEntity, BanInfoEntity];
const useCases = [RegistrationUseCase];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([...entities]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.PORT),
      username: 'postgres',
      password: 'sa',
      database: 'Users',
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers,
  providers: [...useCases, ...services, ...repositories],
})
export class AppModule {}
