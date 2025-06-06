"use server";

import { GetMoviesAction } from "@/@types/get-movies-action.type";
import { searchMovie } from "@/api/queries/search-movie";
import { getMovieRecommendations } from "@/services/gemini";

export const getMoviesByPreference = async (
  userPreferences: string
): Promise<GetMoviesAction> => {
  const movieRecommendations = await getMovieRecommendations(userPreferences);

  if (movieRecommendations && movieRecommendations?.length > 0) {
    const movies = await Promise.all(
      movieRecommendations.map(async (query) => {
        return await searchMovie(query);
      })
    );

    const moviesFiltered = movies.filter((movie) => typeof movie === "object");

    if (moviesFiltered.length > 0) {
      return {
        data: moviesFiltered,
        error: undefined,
      };
    } else {
      return {
        data: [],
        error:
          "Erro ao buscar os filmes no The Movie DB. Tente novamente mais tarde.",
      };
    }
  }

  return {
    data: [],
    error:
      "Nenhum filme encontrado. Mude suas preferências, ou tente novamente mais tarde.",
  };
};
