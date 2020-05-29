import { MovieDTO } from '../dto/movie.dto';

export interface MovieResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieDTO[];
}
