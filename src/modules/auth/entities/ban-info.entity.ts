import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './auth.entity';

@Entity('BanInfo')
export class BanInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // @ApiProperty({ example: 'true', description: 'IsBanned or not' })
  @Column()
  isBanned: boolean;
  // @ApiProperty({ example: 'Any ate', description: 'Date with user is banned' })
  @Column()
  banDate: string;
  // @ApiProperty({
  //   example: 'Bad comment for post or comment',
  //   description: 'BanReason with user is banned',
  // })
  @Column()
  banReason: string;
  @OneToOne(() => User, (user) => user.banInfoId)
  // @JoinColumn({ name: 'userId' })
  user: User;
}

export class BanInfoFor_DB {
  constructor(
    public isBanned: boolean,
    public banDate: string,
    public banReason: string,
  ) {}
}
