import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import categoryImages from "../themeImages"; // ✅ Import des images

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        📌 Choisissez un thème !
      </Typography>

      <Grid container spacing={1} justifyContent="center"> {/* 🔥 Réduit l’espace entre les cartes */}
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Paper
              onClick={() => onSelectCategory(category.id)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "15px",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#1976D2", color: "white", transform: "scale(1.05)" },
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "250px", // 🔥 Augmente la largeur des cartes
                height: "300px", // 🔥 Légèrement plus grandes pour un meilleur rendu
                padding: "15px",
              }}
            >
              <img
                src={categoryImages[category.name] || "/assets/images/default.jpg"}
                alt={category.name}
                style={{
                  width: "100%", 
                  height: "75%", // 🔥 L’image occupe plus d’espace
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
