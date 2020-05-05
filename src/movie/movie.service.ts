import { Injectable } from '@nestjs/common';

import { MoviesListType } from './types/movie.enums';
import { MyHttpService } from 'src/http/http.service';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly http: MyHttpService) {}

  async getMoviesList(listType: MoviesListType) {
    const res = await this.http.get<MovieDto[]>(listType);
    return res.data;
  }

  async findMovieById(id: string) {
    const res = await this.http.get<MovieDto>(`/movie/${id}`);
    return res.data;
  }
}
