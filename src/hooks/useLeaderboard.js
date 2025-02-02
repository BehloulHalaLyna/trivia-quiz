import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔹 Fonction pour récupérer le classement depuis localStorage
const getLeaderboard = () => {
  return JSON.parse(localStorage.getItem("scores")) || [];
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
