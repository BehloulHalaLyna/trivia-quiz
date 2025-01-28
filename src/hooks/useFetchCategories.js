// src/hooks/useFetchCategories.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async () => {
  const { data } = await axios.get("https://opentdb.com/api_category.php");
  return data.trivia_categories;
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"], // Clé de cache
    queryFn: fetchCategories, // Fonction de récupération
    staleTime: 1000 * 60 * 10, // Les données restent valides pendant 10 minutes
  });
};
