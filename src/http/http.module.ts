import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { Services } from '@lib/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // HttpModule.register({
    //   baseURL: process.env.TMDB_URL,
    //   headers: {
    //     Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
    //   },
    // }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return ({
          baseURL: configService.get("TMDB_AUTH_TOKEN"),
          headers: {
            Authorization: `Bearer: ${configService.get("TMDB_AUTH_TOKEN")}`,
          }
        })
      }
    })
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
export class MyHttpModule { }
