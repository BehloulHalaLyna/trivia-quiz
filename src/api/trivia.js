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
