import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";

const ResultsPopup = ({ score, totalQuestions, onRestart }) => {
  return (
    <Modal open={true}>
      <Box sx={{ p: 4, background: "white", borderRadius: "10px", textAlign: "center", width: "300px", margin: "auto" }}>
        <Typography variant="h5">🎉 Résultats</Typography>
        <Typography mt={2}>Score : {score} / {totalQuestions}</Typography>
        <Button onClick={onRestart} sx={{ mt: 2, backgroundColor: "#007BFF", color: "white" }}>Revenir à l'accueil</Button>
      </Box>
    </Modal>
  );
};

export default ResultsPopup;
