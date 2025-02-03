import React, { useState } from "react"; 
import { useFetchCategories } from "./hooks/useFetchCategories";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
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
        default: darkMode ? "#1E2A38" : "#CDE7FF", // Changement du bleu en dark mode
      },
    },
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
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
          backgroundColor: theme.palette.background.default, // ✅ Appliquer le fond selon le mode
        }}
      >
        {/* 🔆 Toggle Dark Mode */}
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 4 }}>
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

        {!showQuiz && !showLeaderboard && (
          <>
            <Typography variant="h3" fontWeight="bold" mt={3}>
              🎉 Bienvenue au Trivia Quiz !
            </Typography>

            {/* 🔹 Champ de pseudo amélioré */}
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

            {/* ✅ Liste des catégories */}
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
