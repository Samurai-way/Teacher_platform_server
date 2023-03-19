import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;
  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 20, { message: 'Minimum 6 and maximum 20' })
  readonly password: string;
}
