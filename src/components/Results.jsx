import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";

const ResultsPopup = ({ score, totalQuestions, onRestart, onViewDetails }) => {
  return (
    <Dialog open={true} onClose={onRestart} maxWidth="sm" fullWidth>
      <DialogTitle>Résultats</DialogTitle>
      <DialogContent>
        <Typography variant="h6" mb={2}>
          Bravo ! Votre score : {score}/{totalQuestions}
        </Typography>
        <Typography mb={2}>
          Cliquez sur "Revoir les résultats" pour voir les détails.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onRestart}
          sx={{ marginRight: 2 }}
        >
          Rejouer
        </Button>
        <Button variant="outlined" color="secondary" onClick={onViewDetails}>
          Revoir les résultats
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsPopup;
