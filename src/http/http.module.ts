import { Module, HttpModule, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../config/http.config.service';
import { MyHttpService } from './http.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

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
  providers: [
    MyHttpService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [MyHttpService],
})
export class MyHttpModule {}
