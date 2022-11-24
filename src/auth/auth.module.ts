import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { Services } from '@src/lib/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
