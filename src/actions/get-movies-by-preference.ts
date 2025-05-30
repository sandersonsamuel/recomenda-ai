"use server";

import { searchMovie } from "@/api/queries/search-movie";
import { getMovieRecommendations } from "@/services/gemini";

export const getMoviesByPreference = async (userPreferences: string) => {
  const movieRecommendations = await getMovieRecommendations(userPreferences);

  if (movieRecommendations && movieRecommendations?.length > 0) {
    const movies = await Promise.all(
      movieRecommendations.map(async (query) => {
        return await searchMovie(query);
      })
    );
    return movies.filter((movie) => !!movie);
  }

  return [];
};
