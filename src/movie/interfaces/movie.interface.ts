import { IQueryParams } from '@src/http/types/http.interface';
import { Observable } from 'rxjs';
import { MovieDTO, Trailer } from '../dto/movie.dto';
import { MoviesListType } from '../types/movie.enums';
import { MovieResponse } from '../types/movie.response';

export interface IMovieService {
  getMoviesList(
    listType: MoviesListType,
    query: IQueryParams,
  ): Observable<MovieResponse>;
  findMovieById(id: string): Observable<MovieDTO>;
  getTrailer(id: string): Observable<Trailer>;
  getMultiple(ids: string[]): Observable<MovieDTO>[]
}
