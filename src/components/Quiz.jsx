import React, { useState, useEffect } from "react";
import { useFetchQuestions } from "../hooks/useFetchQuestions";
import ResultsPopup from "./ResultsPopup";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";

const Quiz = ({ name, category, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const { data: questions, isLoading, error } = useFetchQuestions(category);

  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResultsPopup(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (isLoading) return <Typography>Chargement des questions...</Typography>;
  if (error) return <Typography>Erreur lors du chargement des questions.</Typography>;

  if (!questions || questions.length === 0) {
    return <Typography>Aucune question trouvée.</Typography>;
  }

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([...userAnswers, answer]);
    if (answer === currentQuestion.correct_answer) setScore(score + 1);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResultsPopup(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <Box sx={{ textAlign: "center", p: 4, background: "#E3F2FD", minHeight: "100vh" }}>
      <Typography variant="h6">
        ⏳ Temps restant : {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Typography>
      <CircularProgress variant="determinate" value={(timeLeft / 120) * 100} sx={{ mb: 2 }} />

      <Typography variant="h5" fontWeight="bold">
        Question {currentQuestionIndex + 1}/{questions.length}
      </Typography>
      <Typography variant="body1" mb={3} dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <Grid container spacing={2} justifyContent="center">
        {answers.map((answer, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              onClick={() => handleAnswer(answer)}
              sx={{
                p: 2,
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#6AB7F5", color: "white", transform: "scale(1.05)" },
                boxShadow: 2,
              }}
            >
              {answer}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography mt={4} fontSize="1.2rem" fontWeight="bold">
        Score : {score}
      </Typography>

      {showResultsPopup && <ResultsPopup score={score} totalQuestions={questions.length} onRestart={onFinish} />}
    </Box>
  );
};

export default Quiz;
