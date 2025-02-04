import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useLeaderboard } from "../hooks/useLeaderboard";

// ✅ Mapping des ID en noms de thèmes
const categoriesMap = {
  9: "Culture Générale", 10: "Livres", 11: "Films", 12: "Musique", 13: "Théâtre",
  14: "Télévision", 15: "Jeux Vidéo", 16: "Jeux de Société", 17: "Science & Nature",
  18: "Informatique", 19: "Mathématiques", 20: "Mythologie", 21: "Sports",
  22: "Géographie", 23: "Histoire", 24: "Politique", 25: "Art", 26: "Célébrités",
  27: "Animaux", 28: "Véhicules", 29: "Comics", 30: "Gadgets", 31: "Anime & Manga",
  32: "Dessin Animé",
};

const Leaderboard = ({ onClose }) => {
  const { scores, isLoading, error } = useLeaderboard(); // ✅ Utilisation de React Query

  if (isLoading) return <Typography>Chargement du classement...</Typography>;
  if (error) return <Typography color="error">❌ Erreur lors du chargement du classement.</Typography>;
  if (!scores || scores.length === 0) return <Typography>Aucun score enregistré.</Typography>;

  return (
    <Box sx={{ textAlign: "center", p: 4, background: "#E3F2FD", minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} fontWeight="bold">🏆 Classement des joueurs</Typography>

      {scores.map((entry, index) => (
        <Paper 
          key={index} 
          sx={{ 
            p: 2, mb: 2, backgroundColor: index === 0 ? "#FFD700" : "#BBDEFB", 
            borderRadius: "10px", boxShadow: 2, fontWeight: index === 0 ? "bold" : "normal" 
          }}
        >
          <Typography variant="h6">
            {index + 1}. <strong>{entry.name}</strong> - <strong>{entry.points} pts</strong> 
            ({categoriesMap[entry.themeId] || "Thème inconnu"}) - ⏳ <strong>{entry.timeUsed} sec</strong>
          </Typography>
        </Paper>
      ))}

      <Button 
        variant="contained" 
        onClick={onClose} 
        sx={{ mt: 3, backgroundColor: "#D32F2F", "&:hover": { backgroundColor: "#B71C1C" } }}
      >
        ⬅️ Retour à l'accueil
      </Button>
    </Box>
  );
};

export default Leaderboard;
