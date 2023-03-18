import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserTypeFor_DB, UserViewModal } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(@InjectRepository(User) private db: Repository<User>) {}

  async createUser(newUser: UserTypeFor_DB): Promise<UserViewModal> {
    return this.db.save(newUser);
  }

  async findUserByEmail(email): Promise<UserViewModal> {
    return this.db.findOneBy({ email });
  }
}
