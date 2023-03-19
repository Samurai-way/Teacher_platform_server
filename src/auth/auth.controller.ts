import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';
import { AuthRepository } from './repository/auth.repository';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './application/use-cases/registration-use-case';
import { UserEntity } from './domain/entities/user.entity';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    public authRepo: AuthRepository,
    private commandBus: CommandBus,
  ) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 204, type: '' })
  @HttpCode(204)
  @Post()
  async registration(@Body() registrationDto: UserDto): Promise<UserEntity> {
    return this.commandBus.execute(new RegistrationCommand(registrationDto));
  }

  @Get()
  async findAllUsers() {
    return this.authRepo.getUsers();
  }

  @Put(':id')
  async createIsBanned(
    @Body('toggle') toggle: boolean,
    @Param('id') id: string,
  ) {
    return this.authRepo.createIsBanned(+id, toggle);
  }
}
