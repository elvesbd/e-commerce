import { Injectable } from '@nestjs/common';
import { UserService } from '../../shared/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async findByPayload(payload: any) {
    return sign(payload, process.env.SECRET_OR_KEY, { expiresIn: '2h' });
  }

  async validate(payload: any) {
    return await this.usersService.findByPayload(payload);
  }
}
