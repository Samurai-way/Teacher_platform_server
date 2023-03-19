import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserViewModal } from '../domain/entities/user.entity';
import { BanInfoEntity } from '../domain/entities/ban-info.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity) private userColumn: Repository<UserEntity>,
    @InjectRepository(BanInfoEntity)
    private banInfoColumn: Repository<BanInfoEntity>,
  ) {}

  async createUser(email: string, passwordHash: string): Promise<UserEntity> {
    const newUser = UserEntity.create(email, passwordHash);
    return this.userColumn.save(newUser);
  }

  async getUsers() {
    return (
      this.userColumn
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
    return this.userColumn.findOneBy({ email });
  }

  async createIsBanned(id: number, toggle: boolean) {
    const user = await this.userColumn.findOneBy({ id });
    user.banInfo.isBanned = toggle;
    await this.userColumn.save(user);
    return this.userColumn.findOneBy({ id });
  }
}
