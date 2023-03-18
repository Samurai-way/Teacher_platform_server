import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/auth.entity';
import { CreateUserDto } from '../dto/create-user-dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectRepository(User) private db: Repository<User>) {}

  async createUser(userDto: CreateUserDto) {
    return this.db.create(userDto);
  }
  async findUserByEmail(email): Promise<User[]> {
    return this.db.findBy(email);
  }
}
