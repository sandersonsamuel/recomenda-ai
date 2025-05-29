import { Movie, MoviePagination } from "@/@types/movies.type";

export const searchMovie = async (
  query: string
): Promise<Movie | undefined> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}${query}`
    );
    const data = (await response.json()) as MoviePagination;
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
  }
};
