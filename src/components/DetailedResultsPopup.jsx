import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Grid, Paper } from "@mui/material";

const DetailedResultsPopup = ({ questions, userAnswers, onClose }) => {
  console.log("Données reçues dans DetailedResultsPopup :", { questions, userAnswers });

  // Garde-fou pour éviter les crashs si les données sont absentes
  if (!questions || !userAnswers || questions.length === 0 || userAnswers.length === 0) {
    return (
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Erreur</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Aucune donnée disponible pour afficher les résultats.</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
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
          Résultats Détaillés 📊
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {questions.map((question, index) => {
            const isCorrect = question.correct_answer === userAnswers[index];
            return (
              <Grid item xs={12} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: isCorrect ? "#d4edda" : "#f8d7da",
                    borderLeft: `5px solid ${isCorrect ? "#28a745" : "#dc3545"}`,
                    borderRadius: "10px",
                  }}
                >
                  <Typography dangerouslySetInnerHTML={{ __html: question.question }} />
                  <Typography>Votre réponse : {userAnswers[index]}</Typography>
                  {!isCorrect && (
                    <Typography>Bonne réponse : {question.correct_answer}</Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedResultsPopup;
