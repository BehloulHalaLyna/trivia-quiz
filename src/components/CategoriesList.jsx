import React, { useState, useMemo } from "react";
import { Box, Typography, Grid, Paper, TextField } from "@mui/material";

const CategoriesList = ({ categories, onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 État du filtre

  // ✅ Utilisation de useMemo pour éviter un recalcul inutile
  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]); // 📌 Ne se recalcule que si searchTerm ou categories changent

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📌 Choisissez un thème
      </Typography>

      {/* 🔍 Barre de recherche */}
      <TextField
        fullWidth
        label="🔍 Rechercher un thème..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3, maxWidth: "500px" }}
      />

      {/* 📌 Affichage des catégories filtrées */}
      <Grid container spacing={2} justifyContent="center">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Paper
                onClick={() => onSelectCategory(category.id)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#1976D2", color: "white", transform: "scale(1.05)" },
                  boxShadow: 2,
                }}
              >
                {category.name}
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography color="error" mt={3}>⚠️ Aucun thème trouvé.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CategoriesList;
