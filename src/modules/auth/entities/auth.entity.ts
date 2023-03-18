import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: '', description: 'EmailConfirmation' })
  @Column({ type: 'jsonb' })
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: string;
    isConfirmed: boolean;
  };
  @Column({ type: 'jsonb' })
  banInfo: {
    isBanned: boolean;
    banDate: string;
    banReason: string;
  };
}
