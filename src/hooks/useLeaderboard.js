import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔹 Fonction pour récupérer le classement depuis localStorage
const getLeaderboard = () => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  
  // ✅ Trier par score DESC et temps ASC (en cas d'égalité)
  return scores.sort((a, b) => b.points - a.points || a.timeUsed - b.timeUsed);
};

// 🔹 Fonction pour ajouter un score au classement (en gardant max 10 scores)
const addScoreToLeaderboard = (newScore) => {
  let scores = getLeaderboard();
  
  // ✅ Ajouter le nouveau score
  scores.push(newScore);
  
  // ✅ Trier et ne garder que les 10 meilleurs
  scores = scores
    .sort((a, b) => b.points - a.points || a.timeUsed - b.timeUsed)
    .slice(0, 10); // 🔥 Coupe à 10 scores max

  // ✅ Mise à jour du stockage local
  localStorage.setItem("scores", JSON.stringify(scores));
  return scores;
};

// 🔹 Hook personnalisé pour gérer le classement
export const useLeaderboard = () => {
  const queryClient = useQueryClient();

  // 🔄 Récupérer les scores
  const { data: scores } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  // 🔄 Ajouter un nouveau score
  const mutation = useMutation({
    mutationFn: addScoreToLeaderboard,
    onSuccess: () => {
      queryClient.invalidateQueries(["leaderboard"]); // 🆕 Rafraîchir le classement
    },
  });

  return { scores, addScore: mutation.mutate };
};
