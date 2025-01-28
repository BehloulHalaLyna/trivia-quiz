import React, { useState } from "react";
import { useFetchQuestions } from "../hooks/useFetchQuestions";
import ResultsPopup from "./ResultsPopup"; // Popup pour le score
import DetailedResultsPopup from "./DetailedResultsPopup"; // Popup pour les résultats détaillés
import { Box, Typography, Grid, Paper } from "@mui/material";

const Quiz = ({ name, category }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResultsPopup, setShowResultsPopup] = useState(false); // Popup pour le score
  const [showDetailedResults, setShowDetailedResults] = useState(false); // Popup pour les résultats détaillés
  const { data: questions, isLoading, error } = useFetchQuestions(category);

  // Ajout de logs pour vérifier les données
  console.log("Questions :", questions);
  console.log("Réponses utilisateur :", userAnswers);

  if (isLoading) return <Typography>Chargement des questions...</Typography>;
  if (error) return <Typography>Erreur lors du chargement des questions.</Typography>;

  if (!questions || questions.length === 0) {
    return <Typography>Aucune question trouvée. Veuillez réessayer !</Typography>;
  }

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswers([...userAnswers, answer]); // Stocker la réponse utilisateur
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1); // Incrémenter le score si la réponse est correcte
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Passer à la question suivante
    } else {
      setShowResultsPopup(true); // Afficher le popup des résultats
    }
  };

  const handleRestart = () => {
    // Réinitialiser l’état pour recommencer
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setShowResultsPopup(false);
    setShowDetailedResults(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h5" mb={2}>
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
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              {answer}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography mt={4}>Score : {score}</Typography>

      {/* Popup des résultats */}
      {showResultsPopup && (
        <ResultsPopup
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          onViewDetails={() => setShowDetailedResults(true)} // Affiche les résultats détaillés
        />
      )}

      {/* Popup des résultats détaillés */}
      {showDetailedResults && (
        <DetailedResultsPopup
          questions={questions}
          userAnswers={userAnswers}
          onClose={() => setShowDetailedResults(false)} // Ferme les résultats détaillés
        />
      )}
    </Box>
  );
};

export default Quiz;
