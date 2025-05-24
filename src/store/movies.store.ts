import { Movie } from "@/@types/movies.type";
import { proxy } from "valtio";

type MovieStore = {
  movies: (Movie | null)[];
  lastQuery: string | null;
  loading: boolean;
};

export const moviesStore: MovieStore = proxy({
  movies: [],
  loading: false,
  lastQuery: null,
});
