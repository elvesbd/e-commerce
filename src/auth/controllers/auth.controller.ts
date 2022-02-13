import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../shared/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.findByLogin(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.create(registerDto);
  }
}
