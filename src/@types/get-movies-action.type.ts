import { Movie } from "./movies.type";

export type GetMoviesAction = {
  error?: string;
  data: Movie[];
};
