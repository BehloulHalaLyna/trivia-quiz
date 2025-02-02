import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

const Leaderboard = ({ scores, onClose }) => {
  // 🔥 Tri des scores du plus haut au plus bas
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>🏆 Classement</DialogTitle>
      <DialogContent>
        {sortedScores.length === 0 ? (
          <Typography textAlign="center">Aucun score enregistré.</Typography>
        ) : (
          sortedScores.map((entry, index) => (
            <Typography key={index} sx={{ textAlign: "center", fontSize: "1.2rem" }}>
              {index + 1}. {entry.name && entry.name.trim() !== "" ? entry.name : "Joueur inconnu"} -{" "}
              {typeof entry.score === "number" ? `${entry.score} points` : "0 points"}
            </Typography>
          ))
        )}
        <Box textAlign="center" mt={3}>
          <Button variant="contained" color="primary" onClick={onClose}>
            FERMER
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Leaderboard;
