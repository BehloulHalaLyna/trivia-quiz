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
  const [darkMode, setDarkMode] = useState(false); // ✅ Ajout du mode sombre

  const { data: categories, isLoading, error } = useFetchCategories();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowQuiz(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ textAlign: "center", p: 4, maxWidth: "600px", margin: "auto" }}>
        
        {/* 🔆 Toggle Dark Mode */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {!showQuiz && !showLeaderboard && (
          <>
            <Typography variant="h3" fontWeight="bold" mb={2}>🎉 Bienvenue au Trivia Quiz !</Typography>

            {/* 🔹 Champ de pseudo amélioré */}
            <TextField 
              label="Entrez votre surnom"
              variant="outlined"
              fullWidth
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography variant="h5" fontWeight="bold" mb={2}>📌 Choisissez un thème :</Typography>

            {isLoading && <Typography>⏳ Chargement...</Typography>}
            {error && <Typography color="error">❌ Erreur : Les catégories ne sont pas disponibles.</Typography>}

            {/* ✅ Liste des catégories */}
            {categories && <Categories categories={categories} onSelectCategory={handleCategorySelect} />}

            {/* ✅ Bouton voir classement amélioré */}
            <Button 
              variant="contained" 
              color="secondary"
              sx={{
                mt: 3, 
                fontSize: "1rem", 
                padding: "10px 20px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" }
              }}
              onClick={() => setShowLeaderboard(true)}
            >
              📖 Voir Classement
            </Button>
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
