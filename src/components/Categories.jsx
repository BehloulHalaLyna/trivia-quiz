import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {categories.map((category) => (
        <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
          <Paper
            onClick={() => onSelectCategory(category.id)}
            sx={{
              cursor: "pointer",
              textAlign: "center",
              p: 2,
              borderRadius: "10px",
              transition: "0.3s",
              height: "220px", // ✅ Fixe la hauteur
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "#1976D2",
                color: "white",
              },
              boxShadow: 3,
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold">
              {category.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
