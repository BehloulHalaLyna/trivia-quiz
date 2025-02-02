import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import categoryImages from "../themeImages";

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
      {categories.map((category) => (
        <Grid item key={category.id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 250, borderRadius: "10px", boxShadow: 3 }}>
            <CardActionArea onClick={() => onSelectCategory(category.id)}>
              <CardMedia component="img" height="140" image={categoryImages[category.name] || "/assets/images/default.jpg"} alt={category.name} />
              <CardContent sx={{ backgroundColor: "#64B5F6", color: "white", textAlign: "center" }}>
                <Typography variant="h6">{category.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
