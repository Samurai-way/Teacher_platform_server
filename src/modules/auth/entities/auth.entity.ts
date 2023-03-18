import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class EmailConfirmation {
  @ApiProperty({ example: '12345', description: 'ConfirmationCode' })
  @Column()
  confirmationCode: string;
  @ApiProperty({ example: 'new Date()', description: 'ExpirationDate code' })
  @Column()
  expirationDate: Date;
  @ApiProperty({ example: 'true', description: 'User isConfirmed or not' })
  @Column()
  isConfirmed: boolean;
}

export class BanInfo {
  @ApiProperty({ example: 'true', description: 'Is banned or not' })
  @Column()
  isBanned: boolean;
  @ApiProperty({ example: 'new Date()', description: 'Date of user ban' })
  @Column()
  banDate: Date;
  @ApiProperty({
    example: 'Bad boy, writing bad comments',
    description: 'This boy write me bad comment about my life',
  })
  @Column()
  banReason: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'User id' })
  id: string;
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column()
  email: string;
  @ApiProperty({ example: 'uuid()', description: 'passwordHash for password' })
  @Column()
  passwordHash: string;
  @ApiProperty({ example: 'new Date()', description: 'new Date()' })
  @Column()
  createdAt: string;
  @ApiProperty({ example: EmailConfirmation, description: 'EmailConfirmation' })
  @Column()
  emailConfirmation: EmailConfirmation;
  @ApiProperty({ example: BanInfo, description: 'Description about user ban' })
  @Column()
  banInfo: BanInfo;
}
