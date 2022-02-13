import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from '../models/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  private sanitizeUser(user: User) {
    return user.depopulate('password');
  }

  async create(registerDto: RegisterDto) {
    const { username } = registerDto;
    const user = await this.userModel.findOne({ username });

    if (user) {
      throw new BadRequestException('User already existis');
    }

    const createUser = new this.userModel(registerDto);
    await createUser.save();
    return this.sanitizeUser(createUser);
  }

  async findByLogin(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
