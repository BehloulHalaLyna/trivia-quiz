import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import categoryImages from "../themeImages"; // ✅ Import des images

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🎉 Bienvenue dans TRIVIA QUIZ 🎉
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Paper
              onClick={() => onSelectCategory(category.id)}
              sx={{
                p: 2,
                cursor: "pointer",
                textAlign: "center",
                borderRadius: "10px",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#1976D2", color: "white", transform: "scale(1.05)" },
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={categoryImages[category.name] || "/assets/images/default.jpg"}
                alt={category.name}
                width="150"
                height="150"
                style={{
                  borderRadius: "10px",
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                  marginBottom: "10px",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
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
