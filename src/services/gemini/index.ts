import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function getMovieRecommendations(userPreferences: string) {
  const prompt = `I would like a movie recommendation. Base your suggestions on the following preferences: ${userPreferences}.
    Instructions:
    1. Extract up to 5 **distinct movie titles** mentioned in your response.
    2. For each movie, generate a search string in the following TMDB API format:
      &query=MOVIE_NAME&language=pt-BR
    3. If a **specific year** is mentioned for a movie, append:
      &year=YEAR
    4. In the query field:
      - Replace spaces with +
      - Remove accents and special characters (e.g., é → e, ç → c, etc.)

    Output rules:
    - Return **only** the generated strings, **separated by commas**.
    - **Do not** include explanations, text, or extra formatting.
    - If no suitable movie can be recommended, return an **empty string only** (example: "").
    - **Do not** exceed 5 movie entries.

    Examples:
    Correct: &query=The+Matrix&language=pt-BR,&query=Inception&language=pt-BR&year=2010
    Wrong: &query=The+Matrix&language=pt-BR, &query=Inception&language=pt-BR&year=2010❌
    Wrong: "Here are some movies: The Matrix, Inception" ❌
    Wrong: &query=Amélie&language=pt-BR ❌ (should be: &query=Amelie&language=pt-BR)
    Wrong: Returning 3 movies because you asked for 5 but I only found 3 ❌

    Just follow the rules above strictly.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (response.text === "") {
      return [];
    }

    if (response && response.text) {
      return response.text.split(",");
    }
  } catch (error) {
    console.error("Erro ao obter recomendações de filmes:", error);
  }
}
