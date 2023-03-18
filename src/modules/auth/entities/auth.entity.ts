import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
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
  // @ApiProperty({ example: '', description: 'EmailConfirmation' })
  // @Column({ type: 'jsonb' })
  // emailConfirmation:  // forayng key
  // @Column({ type: 'jsonb' })
  // banInfo: {
  //   isBanned: boolean;
  //   banDate: string;
  //   banReason: string;
  // };
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
