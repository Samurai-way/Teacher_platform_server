import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class EmailConfirmation {
  @Column()
  confirmationCode: string;
  @Column()
  expirationDate: Date;
  @Column()
  isConfirmed: boolean;
}

export class BanInfo {
  @Column()
  isBanned: boolean;
  @Column()
  banDate: Date;
  @Column()
  banReason: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  passwordHash: string;
  @Column()
  createdAt: string;
  @Column()
  description: string;
  @Column()
  emailConfirmation: EmailConfirmation;
  @Column()
  banInfo: BanInfo;
}
