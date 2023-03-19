import { UserDto } from '../../dto/user-dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from '../../repository/auth.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class RegistrationCommand {
  constructor(readonly registrationDto: UserDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationUseCase implements ICommandHandler {
  constructor(public authRepository: AuthRepository) {}

  async execute(command: RegistrationCommand): Promise<UserEntity> {
    const { email, password } = command.registrationDto;
    const user = await this.authRepository.findUserByEmail(email);
    if (user)
      throw new BadRequestException([
        {
          message: 'User with this email is registered',
          field: 'email',
        },
      ]);
    const passwordHash = await bcrypt.hash(password, 5);
    return this.authRepository.createUser(email, passwordHash);
  }
}
