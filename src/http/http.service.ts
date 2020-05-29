import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryParams, IUrl } from './types/http.interface';

@Injectable()
export class MyHttpService {
  movieUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.movieUrl = `${this.configService.get('API_URL')}/movie/`;
  }

  getMovieUrl(movieId?: string, queryParams: IQueryParams = {}) {
    return { path: this.movieUrl + movieId || '', queryParams };
  }

  async get<ResponseData>(url: string, queryParams: IQueryParams = {}) {
    const res = await this.httpService
      .get<ResponseData>(url, {
        params: {
          api_key: this.configService.get('API_KEY'),
          ...queryParams,
        },
      })
      .toPromise();
    return res;
  }

  async getAll<ResponseData>(urls: IUrl[]) {
    const httpRequests = urls.map(url => {
      return this.get<ResponseData>(url.path, url.queryParams);
    });
    const responses = await Promise.all(httpRequests);
    return responses.map(res => res.data);
  }
}
