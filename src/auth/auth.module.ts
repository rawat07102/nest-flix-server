import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { Services } from '@src/lib/constants';

@Module({
  imports: [UserModule, PassportModule],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
