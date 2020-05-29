import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MoviesListType } from './types/movie.enums';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('popular')
  getPopularMovies(@Query() query) {
    console.log(query);
    return this.movieService.getMoviesList(MoviesListType.POPULAR);
  }

  @Get('top-rated')
  getLatestMovies() {
    return this.movieService.getMoviesList(MoviesListType.TOP_RATED);
  }

  @Get(':id')
  getMovieDetails(@Param() params: { id: string }) {
    return this.movieService.findMovieById(params.id);
  }
}
