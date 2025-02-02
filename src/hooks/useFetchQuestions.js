import { useQuery } from "@tanstack/react-query";

const fetchQuestions = async (category) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`);
  
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des questions");
  }

  const data = await response.json();

  // Vérifier si on a bien des questions
  if (!data.results || data.results.length === 0) {
    throw new Error("Aucune question trouvée pour cette catégorie !");
  }

  return data.results;
};

export const useFetchQuestions = (category) => {
  return useQuery({
    queryKey: ["questions", category], // ✅ Cache selon la catégorie sélectionnée
    queryFn: () => fetchQuestions(category),
    retry: 3, // ✅ Réessaie jusqu'à 3 fois en cas d'erreur API
    refetchOnWindowFocus: false, // ✅ Ne refait pas un fetch en changeant d'onglet
    refetchInterval: 60000, // ✅ Rafraîchit les questions toutes les 60 sec
    staleTime: 300000, // ✅ Considère les données comme "fraîches" pendant 5 min
    cacheTime: 900000, // ✅ Conserve les questions en cache pendant 15 min
  });
};
