import { IQueryParams } from '@src/http/types/http.interface';
import { MoviesListType } from '../types/movie.enums';
import { MovieResponse } from '../types/movie.response';

export interface IMovieService {
  getMoviesList(
    listType: MoviesListType,
    query: IQueryParams,
  ): Promise<MovieResponse>;
  findMovieById(id: string): Promise<MovieResponse>;
  getTrailer(id: string): Promise<string>;
}
