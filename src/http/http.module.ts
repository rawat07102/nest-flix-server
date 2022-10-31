import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../config/http.config.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { Services } from '@src/lib/constants';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: Services.HTTP_SERVICE,
      useClass: HttpService,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [
    {
      provide: Services.HTTP_SERVICE,
      useClass: HttpService,
    },
  ],
})
export class MyHttpModule {}
