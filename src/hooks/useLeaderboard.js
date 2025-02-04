import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔹 Fonction pour récupérer et trier le classement
const getLeaderboard = () => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // 🔄 Trier par score décroissant, puis par temps croissant en cas d'égalité
  return scores.sort((a, b) => {
    if (b.points === a.points) {
      return a.timeUsed - b.timeUsed; // Plus rapide en premier
    }
    return b.points - a.points; // Plus grand score en premier
  });
};

// 🔹 Fonction pour ajouter un score au classement
const addScoreToLeaderboard = (newScore) => {
  const scores = getLeaderboard();
  scores.push(newScore);
  localStorage.setItem("scores", JSON.stringify(scores));
  return scores;
};

// 🔹 Hook personnalisé pour gérer le classement
export const useLeaderboard = () => {
  const queryClient = useQueryClient();

  // 🔄 Récupérer les scores triés
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
