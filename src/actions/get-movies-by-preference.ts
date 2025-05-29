"use server";

import { searchMovie } from "@/api/queries/search-movie";
import { getMovieRecommendations } from "@/services/gemini";

export const getMoviesByPreference = async (formData: FormData) => {
  const userPreferences = formData.get("userPreferences") as string;

  const movieRecommendations = await getMovieRecommendations(userPreferences);

  if (movieRecommendations && movieRecommendations?.length > 0) {
    const movies = await Promise.all(
      movieRecommendations.map(async (query) => {
        return await searchMovie(query);
      })
    );

    return movies
      .map((movie) => {
        if (movie && movie?.results?.length > 0) {
          return movie.results[0];
        }
        return null;
      })
      .filter(Boolean);
  }

  return [];
};
