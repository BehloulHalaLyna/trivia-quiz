import React, { useState } from "react";
import Categories from "./components/Categories";
import Quiz from "./components/Quiz";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { Box, Typography, TextField, AppBar, Toolbar } from "@mui/material";

const App = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categories, isLoading, error } = useFetchCategories();

  if (isLoading) return <Typography>Chargement des catégories...</Typography>;
  if (error) return <Typography>Erreur lors du chargement des catégories.</Typography>;

  if (!selectedCategory) {
    return (
      <Box>
        <AppBar position="static" sx={{ backgroundColor: "#6A0572" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Trivia Quiz 🎉
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            background: "linear-gradient(135deg, #FAD6A5, #FF9A8B)",
            color: "#333",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" mb={3}>
            Bienvenue au Trivia Quiz !
          </Typography>
          <TextField
            label="Entrez votre surnom"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              mb: 3,
              width: "300px",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          />
          <Typography variant="h6" mb={2}>
            Choisissez un thème :
          </Typography>
          <Categories
            categories={categories}
            onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
          />
        </Box>
      </Box>
    );
  }

  return <Quiz name={name} category={selectedCategory} />;
};

export default App;
