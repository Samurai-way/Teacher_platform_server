import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BanInfoEntity } from './ban-info.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'User id' })
  id: number;
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column()
  email: string;
  @ApiProperty({ example: 'uuid()', description: 'passwordHash for password' })
  @Column()
  passwordHash: string;
  @ApiProperty({ example: 'new Date()', description: 'new Date()' })
  @Column()
  createdAt: string;
  @OneToOne(() => BanInfoEntity, (banInfo) => banInfo.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  banInfo: BanInfoEntity;

  static create(email: string, passwordHash: string): UserEntity {
    const banInfo = new BanInfoEntity();
    banInfo.isBanned = false;
    banInfo.banDate = new Date().toISOString();
    banInfo.banReason = 'None';

    const userForDb = new UserEntity();
    userForDb.email = email;
    userForDb.createdAt = new Date().toISOString();
    userForDb.passwordHash = passwordHash;
    userForDb.banInfo = banInfo;
    return userForDb;
  }
}

export class UserViewModal {
  constructor(
    public id: number,
    public email: string,
    public passwordHash: string,
    public createdAt: string,
  ) {}
}
