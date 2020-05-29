export interface IQueryParams {
  [key: string]: any;
}

export interface IUrl {
  path: string;
  queryParams?: IQueryParams;
}
