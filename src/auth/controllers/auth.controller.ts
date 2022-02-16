import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../shared/user.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByLogin(loginDto);
    const payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.findByPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    const payload = {
      username: user.username,
      seller: user.seller,
    };

    const token = await this.authService.findByPayload(payload);
    return { user, token };
  }
}
