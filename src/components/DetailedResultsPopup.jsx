import React from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import he from "he"; // ✅ Import pour décoder

const DetailedResultsPopup = ({ questions, userAnswers, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle align="center" sx={{ fontSize: "1.5rem", fontWeight: "bold", backgroundColor: "#E3F2FD" }}>
        📖 Détails des Réponses
      </DialogTitle>
      <DialogContent>
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correct_answer;
          return (
            <Box
              key={index}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: "10px",
                backgroundColor: isCorrect ? "#C8E6C9" : "#FFCDD2", // ✅ Vert si correct, rouge si faux
                boxShadow: 2,
              }}
            >
              <Typography fontWeight="bold" dangerouslySetInnerHTML={{ __html: question.question }} />
              <Typography>
                <strong>Ta réponse :</strong> {he.decode(userAnswers[index])}
              </Typography>
              {!isCorrect && (
                <Typography>
                  <strong>Bonne réponse :</strong> <span style={{ color: "green" }}>{question.correct_answer}</span>
                </Typography>
              )}
            </Box>
          );
        })}

        {/* 🔙 Fermer */}
        <Button variant="contained" color="error" onClick={onClose} sx={{ mt: 2 }}>
          Fermer ❌
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedResultsPopup;
