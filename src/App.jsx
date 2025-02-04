import React, { useState } from "react"; 
import { useFetchCategories } from "./hooks/useFetchCategories";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Box, Typography, Button, TextField } from "@mui/material";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { data: categories, isLoading, error } = useFetchCategories();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#1E2A38" : "#CDE7FF",
      },
    },
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
  };

  const handleGoBack = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (showLeaderboard) {
      setShowLeaderboard(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box 
        sx={{ 
          textAlign: "center", 
          p: 4, 
          width: "100vw", 
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* ✅ Barre de navigation avec espace ajouté */}
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 4, mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: "50px", fontSize: "1rem", padding: "10px 20px" }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>

          <Button 
            variant="contained" 
            color="success"
            sx={{ fontSize: "1rem", padding: "10px 20px" }}
            onClick={() => setShowLeaderboard(true)}
          >
            📖 Voir Classement
          </Button>
        </Box>

        {/* ✅ Bouton Retour - UNIQUEMENT si on est dans le Quiz */}
        {showQuiz && (
          <Button 
            variant="contained" 
            color="warning"
            sx={{ mt: 3, fontSize: "1rem", padding: "10px 20px" }}
            onClick={handleGoBack}
          >
            🔙 Retour
          </Button>
        )}

        {/* ✅ Page d'accueil */}
        {!showQuiz && !showLeaderboard && (
          <>
            <Typography variant="h3" fontWeight="bold" mt={3}>
              🎉 Bienvenue au Trivia Quiz !
            </Typography>

            <TextField 
              label="👍 Entrez votre surnom"
              variant="outlined"
              fullWidth
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              sx={{ mt: 3, mb: 3, backgroundColor: "#FFF", borderRadius: "10px" }}
            />

            {isLoading && <Typography>⏳ Chargement...</Typography>}
            {error && <Typography color="error">❌ Erreur : Les catégories ne sont pas disponibles.</Typography>}

            {categories && <Categories categories={categories} onSelectCategory={handleCategorySelect} />}
          </>
        )}

        {/* ✅ Affichage du Quiz */}
        {showQuiz && <Quiz name={playerName} category={selectedCategory} onFinish={() => setShowQuiz(false)} />}

        {/* ✅ Affichage du Classement */}
        {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      </Box>
    </ThemeProvider>
  );
};

export default App;
