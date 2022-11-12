import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { Services } from '@src/lib/constants';

@Global()
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
  ],
})
export class MyHttpModule {}
