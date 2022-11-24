import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Services } from '@src/lib/constants';
import { HttpModule } from '@nestjs/axios';

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
      provide: Services.MOVIE_SERVICE,
      useClass: MovieService,
    },
  ],
  exports: [
    {
      provide: Services.MOVIE_SERVICE,
      useClass: MovieService,
    },
  ],
  controllers: [MovieController],
})
export class MovieModule {}
