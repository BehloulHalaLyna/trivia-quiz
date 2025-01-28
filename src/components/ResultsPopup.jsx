import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";

const ResultsPopup = ({ score, totalQuestions, onRestart, onViewDetails }) => {
  return (
    <Dialog
      open={true}
      onClose={onRestart}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
          Résultats 🎉
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" mb={2} sx={{ textAlign: "center", fontWeight: "bold" }}>
          Bravo ! Votre score : {score}/{totalQuestions}
        </Typography>
        <Typography mb={2} sx={{ textAlign: "center" }}>
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
