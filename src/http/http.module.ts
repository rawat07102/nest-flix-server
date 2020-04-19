import { Module, HttpModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../config/http.config.service';
import { MyHttpService } from './http.service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [MyHttpService],
  exports: [MyHttpService],
})
export class MyHttpModule {}
