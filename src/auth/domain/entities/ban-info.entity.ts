import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

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
  @OneToOne(() => UserEntity, (user) => user.banInfo)
  // @JoinColumn({ name: 'userId' })
  user: UserEntity;
}

export class BanInfoFor_DB {
  constructor(
    public isBanned: boolean,
    public banDate: string,
    public banReason: string,
  ) {}
}
