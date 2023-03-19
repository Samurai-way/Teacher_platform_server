import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BanInfoEntity } from './ban-info.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  // @ApiProperty({ example: '1', description: 'User id' })
  id: number;
  // @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column()
  email: string;
  // @ApiProperty({ example: 'uuid()', description: 'passwordHash for password' })
  @Column()
  passwordHash: string;
  // @ApiProperty({ example: 'new Date()', description: 'new Date()' })
  @Column()
  createdAt: string;
  @OneToOne(() => BanInfoEntity, (banInfo) => banInfo.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  banInfo: BanInfoEntity;
}

export class UserTypeFor_DB {
  constructor(
    public email: string,
    public passwordHash: string,
    public createdAt: string,
  ) {}
}

export class UserViewModal {
  constructor(
    public id: number,
    public email: string,
    public passwordHash: string,
    public createdAt: string,
  ) {}
}
