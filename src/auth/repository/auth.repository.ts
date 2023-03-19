import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserViewModal } from '../domain/entities/user.entity';
import { BanInfoEntity } from '../domain/entities/ban-info.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private db: Repository<User>,
    @InjectRepository(BanInfoEntity)
    private banInfoRepository: Repository<BanInfoEntity>,
  ) {}

  async createUser(banInfo: BanInfoEntity, userForDb: User) {
    await this.banInfoRepository.save(banInfo);
    await this.db.save(userForDb);
    return true;
  }

  async getUsers() {
    return (
      this.db
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.banInfo', 'banInfo')
        // .select([
        //   'user.id',
        //   'user.email',
        //   'user.createdAt',
        //   'banInfo.isBanned',
        //   'banInfo.banDate',
        //   'banInfo.banReason',
        // ])
        .addSelect('banInfo.id', 'banInfo.id')
        // .addSelect('banInfo.isBanned', 'banInfo.isBanned')
        // .addSelect('banInfo.banDate', 'banInfo.banDate')
        .getMany()
    );
  }

  async findUserByEmail(email): Promise<UserViewModal> {
    return this.db.findOneBy({ email });
  }

  async createIsBanned(id: number, toggle: boolean) {
    const user = await this.db.findOneBy({ id });
    user.banInfo.isBanned = toggle;
    await this.db.save(user);
    return this.db.findOneBy({ id });
  }
}
