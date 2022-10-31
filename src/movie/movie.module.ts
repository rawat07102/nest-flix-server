import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Services } from '@src/lib/constants';

@Module({
  providers: [{
    provide: Services.MOVIE_SERVICE,
    useClass: MovieService,
  }],
  controllers: [MovieController],
})
export class MovieModule {}
