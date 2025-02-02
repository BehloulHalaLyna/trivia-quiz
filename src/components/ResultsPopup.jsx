import React from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const ResultsPopup = ({ score, totalQuestions, onRestart, onViewDetails, onFinish, onClose }) => {
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

        {/* 🔍 Bouton Voir les Détails */}
        <Button variant="contained" color="primary" onClick={onViewDetails} sx={{ mt: 2 }}>
          Voir les réponses 📖
        </Button>

        {/* 🔄 Rejouer */}
        <Button variant="contained" color="success" onClick={onFinish} sx={{ mt: 2, ml: 2 }}>
          🔄 Rejouer
        </Button>

        {/* ❌ Fermer */}
        <Button variant="outlined" color="error" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Fermer ❌
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsPopup;
