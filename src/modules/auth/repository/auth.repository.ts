import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserViewModal } from '../entities/auth.entity';
import { BanInfoEntity } from '../entities/ban-info.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private db: Repository<User>,
    @InjectRepository(BanInfoEntity)
    private banInfoRepository: Repository<BanInfoEntity>,
  ) {}

  async createUser(banInfo: BanInfoEntity, userForDb: User) {
    const res = await this.banInfoRepository.save(banInfo);
    userForDb.banInfoId = res.id;
    return this.db.save(userForDb);
  }
  async getUsers() {
    return this.db.find({ relations: ['banInfoId'] });
  }
  async findUserByEmail(email): Promise<UserViewModal> {
    return this.db.findOneBy({ email });
  }
}
