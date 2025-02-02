import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Box, Paper } from "@mui/material";

const DetailedResultsPopup = ({ questions, userAnswers, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        📝 Résultats détaillés
      </DialogTitle>
      <DialogContent>
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correct_answer;
          return (
            <Paper key={index} sx={{ p: 2, my: 2, backgroundColor: "#f5f5f5" }}>
              <Typography sx={{ fontWeight: "bold" }}>{question.question}</Typography>
              <Typography color={isCorrect ? "green" : "red"}>
                Ta réponse : {userAnswers[index] || "Aucune réponse"}
              </Typography>
              <Typography sx={{ fontWeight: "bold", color: "green" }}>
                ✅ Bonne réponse : {question.correct_answer}
              </Typography>
            </Paper>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default DetailedResultsPopup;
