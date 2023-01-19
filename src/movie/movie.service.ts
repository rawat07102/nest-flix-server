import { BadRequestException, Injectable } from '@nestjs/common';
import { IQueryParams } from '@src/http/types/http.interface';
import { map, Observable } from 'rxjs';

import { MovieResponse, VideoResponse } from './types/movie.response';
import { MoviesListType } from './types/movie.enums';
import { IMovieService } from './interfaces/movie.interface';
import { HttpService } from '@nestjs/axios';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MovieService implements IMovieService {
  constructor(private readonly http: HttpService) { }

  getLatest(): Observable<MovieResponse> {
    return this.http
      .get<MovieResponse>("movie/latest")
      .pipe(map((value) => value.data));
  }

  getMoviesList(listType: MoviesListType, query: IQueryParams = {}) {
    return this.http
      .get<MovieResponse>(listType, query)
      .pipe(map((value) => value.data));
  }

  findMovieById(id: string) {
    return this.http.get<MovieDTO>(`/movie/${id}`).pipe(map((res) => res.data));
  }

  getTrailer(id: string) {
    try {
      return this.http.get<VideoResponse>(`/movie/${id}/videos`).pipe(
        map((res) => res.data.results),
        map((value) => value[0]),
      );
    } catch (err) {
      throw new BadRequestException('Trailer does not Exist');
    }
  }

  getMultiple(ids: string[]): Observable<MovieDTO>[] {
    return ids.map((id) => this.http.get(id).pipe(map((res) => res.data)));
  }
}
