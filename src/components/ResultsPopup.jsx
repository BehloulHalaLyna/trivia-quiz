import React from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const ResultsPopup = ({ score, totalQuestions, userAnswers, onRestart, onViewDetails, onClose, timeUsed }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle align="center" sx={{ fontSize: "1.5rem", fontWeight: "bold", backgroundColor: "#E3F2FD" }}>
        🏆 Résultats du Quiz
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", p: 3 }}>
  <Typography variant="h5" fontWeight="bold">
    Score : {score} / {totalQuestions}
  </Typography>
  <Typography variant="body1" color="textSecondary" sx={{ mt: 1, mb: 3 }}>
    {score >= totalQuestions / 2 ? "Bravo 🎉" : "Dommage, réessaie !"}
  </Typography>

  {/* ✅ Condition pour cacher si le temps est 120s */}
  {timeUsed !== 120 && (
    <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
      ⏳ Temps utilisé : {timeUsed} secondes
    </Typography>
  )}

  {/* 📌 Container Flexbox pour bien centrer */}
  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
    {/* 🔍 Voir les Détails */}
    <Button variant="contained" color="primary" onClick={onViewDetails}>
      Voir les réponses 📖
    </Button>

    {/* 🔄 Rejouer */}
    <Button variant="contained" color="success" onClick={onRestart}>
      🔄 Rejouer
    </Button>

    {/* ❌ Fermer */}
    <Button variant="outlined" color="error" onClick={onClose}>
      Fermer ❌
    </Button>
  </Box>
</DialogContent>

    </Dialog>
  );
};

export default ResultsPopup;
