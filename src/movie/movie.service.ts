import { Injectable } from '@nestjs/common';

import { MoviesListType } from './types/movie.enums';
import { MyHttpService } from 'src/http/http.service';

@Injectable()
export class MovieService {
  constructor(private readonly http: MyHttpService) {}

  async getMoviesList(listType: MoviesListType) {
    const res = await this.http.get(listType);
    return res.data;
  }

  async findMovieById(id: string) {
    const res = await this.http.get(`/movie/${id}`);
    return res.data;
  }
}
