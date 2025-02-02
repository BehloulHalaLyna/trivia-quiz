import React, { useState, useEffect } from "react";
import he from "he"; // ✅ Import pour décoder les caractères HTML
import { useFetchQuestions } from "../hooks/useFetchQuestions";
import ResultsPopup from "./ResultsPopup";
import DetailedResultsPopup from "./DetailedResultsPopup";
import { Box, Typography, Grid, Paper, LinearProgress, Button } from "@mui/material";

const Quiz = ({ name, category, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const { data: questions, isLoading, error } = useFetchQuestions(category);

  // ⏳ Timer Global - 2 minutes
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

  // ✅ Vérifier si les questions sont bien chargées
  if (isLoading) return <Typography>Chargement des questions...</Typography>;
  if (error) return <Typography>Erreur lors du chargement des questions.</Typography>;
  if (!questions || questions.length === 0) {
    return <Typography>Aucune question trouvée. Veuillez réessayer !</Typography>;
  }

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([...userAnswers, answer]);

    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResultsPopup(true);
    }
  };

  // 🔄 Fonction pour revenir en arrière
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswers(userAnswers.slice(0, -1)); // Retirer la dernière réponse donnée
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(120);
    setShowResultsPopup(false);
    setShowDetailedResults(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <Box sx={{ textAlign: "center", p: 4, background: "#E3F2FD", borderRadius: "10px", boxShadow: 3, maxWidth: "800px", margin: "auto", mt: 5 }}>
      {/* 🕒 Timer */}
      <Typography variant="h6" fontWeight="bold" color={timeLeft <= 10 ? "red" : "black"}>
        ⏳ Temps restant : {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(timeLeft / 120) * 100}
        sx={{ height: 10, borderRadius: 5, backgroundColor: "#ddd", "& .MuiLinearProgress-bar": { backgroundColor: timeLeft <= 10 ? "red" : "#1976D2" } }}
      />

      {/* 📌 Question */}
      <Typography variant="h5" fontWeight="bold" mt={3} mb={2}>
        Question {currentQuestionIndex + 1}/{questions.length}
      </Typography>
      <Typography variant="body1" mb={3} p={2} sx={{ background: "#ffffff", borderRadius: "10px", boxShadow: 2, fontSize: "1.2rem" }} 
        dangerouslySetInnerHTML={{ __html: he.decode(currentQuestion.question) }} 
      />

      {/* 🔥 Réponses */}
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
                backgroundColor: "#fff",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#1976D2", color: "white", transform: "scale(1.05)" },
                boxShadow: 2,
              }}
            >
              {he.decode(answer)} {/* ✅ Décodage pour éviter les &quot; */}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography mt={4} fontSize="1.2rem" fontWeight="bold">
        Score : {score}
      </Typography>

      {/* 🎯 Bouton Question Précédente */}
      <Button 
        variant="contained" 
        color="warning" 
        onClick={handlePreviousQuestion} 
        sx={{ mt: 3, mr: 2 }} 
        disabled={currentQuestionIndex === 0} // Désactiver si c'est la première question
      >
        ⬅️ Question précédente
      </Button>

      {/* Popups des résultats */}
      {showResultsPopup && (
        <ResultsPopup
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onFinish={onFinish}
          onViewDetails={() => setShowDetailedResults(true)}
          onClose={() => setShowResultsPopup(false)} // ✅ Correction ici !
        />
      )}

      {showDetailedResults && (
        <DetailedResultsPopup
          questions={questions}
          userAnswers={userAnswers}
          onClose={() => setShowDetailedResults(false)}
        />
      )}

      {/* 🎯 Bouton Retour */}
      <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={onFinish}>
        ⬅️ Retour à l'accueil
      </Button>
    </Box>
  );
};

export default Quiz;
