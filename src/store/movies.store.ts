import { Movie } from "@/@types/movies.type";
import { proxy } from "valtio";

type MovieStore = {
  movies: Movie[];
  lastQuery: string | null;
  loading: boolean;
  error: string | null;
};

export const moviesStore: MovieStore = proxy({
  movies: [],
  loading: false,
  lastQuery: null,
  error: null,
});
