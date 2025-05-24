import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function getMovieRecommendations(userPreferences: string) {
  const prompt = `Eu gostaria de uma recomendação de filmes. Baseie suas sugestões nas seguintes preferências: ${userPreferences}.
  Extraia até 5 nomes distintos de filmes mencionados. Para cada filme, gere uma string no formato de busca da API do TMDB:
  &query=NOME_DO_FILME&language=pt-BR
  Se for mencionado um ano específico relacionado ao filme, adicione &year=ANO ao final.
  Regras:
  Substitua espaços por + no campo query.
  Remova acentos e caracteres especiais dos nomes dos filmes apenas na parte do query.
  Limite a saída a no máximo 5 filmes.
  Retorne apenas as strings formatadas, separadas por virgula, sem explicações adicionais.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (response && response.text) {
      return response.text.split(",");
    }
  } catch (error) {
    console.error("Erro ao obter recomendações de filmes:", error);
  }
}
