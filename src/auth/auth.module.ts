import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
