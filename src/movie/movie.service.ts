import { BadRequestException, Injectable } from '@nestjs/common';
import { MyHttpService } from '@src/http/http.service';
import { IQueryParams } from '@src/http/types/http.interface';

import { MovieResponse, VideoResponse } from './types/movie.response';
import { MoviesListType } from './types/movie.enums';

@Injectable()
export class MovieService {
  constructor(private readonly http: MyHttpService) {}

  async getMoviesList(listType: MoviesListType, query: IQueryParams = {}) {
    const res = await this.http.get<MovieResponse>(listType, query);
    return res.data;
  }

  async findMovieById(id: string) {
    const res = await this.http.get<MovieResponse>(`/movie/${id}`);
    return res.data;
  }

  async getTrailer(id: string) {
    try {
      const res = await this.http.get<VideoResponse>(`/movie/${id}/videos`);
      return res.data.results[0].key;
    } catch (err) {
      throw new BadRequestException('Trailer does not Exist');
    }
  }
}
