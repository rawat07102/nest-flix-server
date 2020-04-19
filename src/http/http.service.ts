import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async get(url: string) {
    return await this.httpService
      .get(url, {
        params: {
          api_key: this.configService.get('API_KEY'),
        },
      })
      .toPromise();
  }
}
