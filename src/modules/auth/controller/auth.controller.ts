import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user-dto';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 204, type: '' })
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
