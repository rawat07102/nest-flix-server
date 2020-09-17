import { MovieDTO, Trailer } from '../dto/movie.dto';

export interface MovieResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: MovieDTO[];
}

export interface VideoResponse {
  id: string;
  results: Trailer[];
}
