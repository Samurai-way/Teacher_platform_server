import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user-dto';
import { AuthRepository } from '../repository/auth.repository';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    public authService: AuthService,
    public authRepo: AuthRepository,
  ) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 204, type: '' })
  @HttpCode(204)
  @Post()
  async registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
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
