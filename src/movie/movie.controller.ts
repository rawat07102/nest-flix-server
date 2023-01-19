import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MoviesListType } from './types/movie.enums';
import { IQueryParams } from 'src/http/types/http.interface';
import { Services } from '@src/lib/constants';

@Controller('movie')
export class MovieController {
  constructor(
    @Inject(Services.MOVIE_SERVICE)
    private readonly movieService: MovieService,
  ) { }

  @Get("latest")
  async latest() {
    return this.movieService.getLatest()
  }

  @Get('popular')
  getPopularMovies(@Query() query: IQueryParams) {
    return this.movieService.getMoviesList(MoviesListType.POPULAR, query);
  }

  @Get('top-rated')
  getLatestMovies(@Query() query: IQueryParams) {
    return this.movieService.getMoviesList(MoviesListType.TOP_RATED, query);
  }

  @Get(':id')
  getMovieDetails(@Param() params: { id: string }) {
    return this.movieService.findMovieById(params.id);
  }

  @Get(':id/trailer')
  getMovieTrailer(@Param() params: { id: string }) {
    return this.movieService.getTrailer(params.id);
  }
}
