import { useQuery } from "@tanstack/react-query";

const fetchQuestions = async (category) => {
  const url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
  const response = await fetch(url);
  
  if (!response.ok) throw new Error("Erreur lors de la récupération des questions");

  const data = await response.json();
  console.log("API Response :", data); // ✅ Vérifier la structure de la réponse

  return data.results || []; // ✅ Retourner un tableau vide si `results` est `undefined`
};

export const useFetchQuestions = (category) => {
  return useQuery({
    queryKey: ["questions", category],
    queryFn: () => fetchQuestions(category),
    enabled: !!category, // ✅ Empêcher la requête si `category` est `null`
  });
};
