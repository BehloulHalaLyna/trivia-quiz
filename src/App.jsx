import React, { useState } from "react";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { Box, Typography, TextField, AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { data: categories, isLoading, error } = useFetchCategories();

  if (isLoading) return <Typography>Chargement des catégories...</Typography>;
  if (error) return <Typography>Erreur lors du chargement des catégories.</Typography>;

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#6AB7F5" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trivia Quiz 🎉
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowLeaderboard(true)}
          >
            🏆 Voir le Classement
          </Button>
        </Toolbar>
      </AppBar>

      {!selectedCategory ? (
        <Box sx={{ textAlign: "center", p: 4, background: "#E3F2FD", minHeight: "100vh" }}>
          <Typography variant="h4" mb={3}>Bienvenue au Trivia Quiz !</Typography>
          <TextField
            label="Entrez votre surnom"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3, width: "300px", backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <Typography variant="h6" mb={2}>Choisissez un thème :</Typography>
          <Categories categories={categories} onSelectCategory={setSelectedCategory} />
        </Box>
      ) : (
        <Quiz name={name} category={selectedCategory} onFinish={() => setSelectedCategory(null)} />
      )}

      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
    </Box>
  );
};

export default App;
