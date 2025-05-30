"use server";

import { Movie, MoviePagination } from "@/@types/movies.type";

export const searchMovie = async (
  query: string
): Promise<Movie | undefined> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`
    );
    const data = (await response.json()) as MoviePagination;
    return data.results[0];
  } catch (error: any) {
    console.error("Erro ao buscar filme:", error);
  }
};
