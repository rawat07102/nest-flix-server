import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MoviesListType } from './types/movie.enums';
import { IQueryParams } from 'src/http/types/http.interface';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

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
}
