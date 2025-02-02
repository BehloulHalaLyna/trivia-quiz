import axios from "axios";

const BASE_URL = "https://opentdb.com/api.php";
const CATEGORY_URL = "https://opentdb.com/api_category.php";

export const fetchTriviaQuestions = async (amount = 10, category = "") => {
  const url = `${BASE_URL}?amount=${amount}&type=multiple${category ? `&category=${category}` : ""}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchTriviaCategories = async () => {
  const response = await axios.get(CATEGORY_URL);
  return response.data.trivia_categories;
};

export const themeMapping = {
  9: "Culture Générale",
  10: "Divertissement : Livres",
  11: "Cinéma",
  12: "Musique",
  13: "Théâtre",
  14: "Télévision",
  15: "Science",
  16: "Mathématiques",
  17: "Mythologie",
  18: "Sport",
  19: "Géographie",
  20: "Histoire",
  21: "Politique",
  22: "Art",
  23: "Jeux vidéo",
  24: "Ordinateurs",
  25: "Gadgets",
  26: "Dessin Animé & Anime",
  27: "Comics"
};
