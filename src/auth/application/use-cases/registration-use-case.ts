import { UserDto } from '../../dto/user-dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../auth.service';

export class RegistrationCommand {
  constructor(readonly registrationDto: UserDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationUseCase implements ICommandHandler {
  constructor(public authService: AuthService) {}
  async execute(command: RegistrationCommand) {}
}
