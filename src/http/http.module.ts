import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpConfigService } from '../config/http.config.service';
import { MyHttpService } from './http.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: HttpConfigService,
      inject: [ConfigService],
    }),
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
