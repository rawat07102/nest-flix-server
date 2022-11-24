import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { Services } from '@lib/constants';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.TMDB_URL,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: Services.HTTP_SERVICE,
      useClass: HttpService,
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
