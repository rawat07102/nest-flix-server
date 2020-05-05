import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyHttpService {
  movieUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.movieUrl = `${this.configService.get('API_URL')}/movie/`;
  }

  getMovieUrl(movieId?: string) {
    return this.movieUrl + movieId || '';
  }

  async get<ResponseData>(url: string) {
    return await this.httpService
      .get<ResponseData>(url, {
        params: {
          api_key: this.configService.get('API_KEY'),
        },
      })
      .toPromise();
  }

  async getAll<ResponseData>(urls: string[]) {
    const httpRequests = urls.map(url => {
      return this.get<ResponseData>(url);
    });
    const responses = await Promise.all(httpRequests);
    return responses.map(res => res.data);
  }
}
