import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
  
  const data = await response.json();
  return data.trivia_categories; // ✅ Retourne directement les catégories
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
