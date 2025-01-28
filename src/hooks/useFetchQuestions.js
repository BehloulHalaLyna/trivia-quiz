// src/hooks/useFetchQuestions.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchQuestions = async ({ queryKey }) => {
  const [{ category, amount }] = queryKey.slice(1); // On récupère les paramètres du queryKey
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&type=multiple&category=${category}`
  );
  return data.results;
};

export const useFetchQuestions = (category, amount = 10) => {
  return useQuery({
    queryKey: ["questions", { category, amount }], // Paramètres passés dans queryKey
    queryFn: fetchQuestions, // Fonction de récupération
    enabled: !!category, // Lance la requête uniquement si la catégorie est définie
  });
};
