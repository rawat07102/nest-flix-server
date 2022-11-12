import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IQueryParams, IUrl } from '../types/http.interface';

export interface IHttpService {
  //get<T>(url: string, queryParams: IQueryParams): Promise<AxiosResponse<T>>;
  getAll<T>(urls: IUrl[]): Observable<T[]>;
}
