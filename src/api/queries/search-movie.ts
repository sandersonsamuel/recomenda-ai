import { MoviePagination } from "@/@types/movies.type";

export const searchMovie = async (
  query: string
): Promise<MoviePagination | null> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}${query}`
    );
    const data = (await response.json()) as MoviePagination;
    return data;
  } catch (error) {
    console.error("Erro ao buscar filme:", error);
    return null;
  }
};
