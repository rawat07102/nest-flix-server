import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Services } from '@src/lib/constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) =>
        ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        } as JwtModuleOptions),
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule,
  ],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
