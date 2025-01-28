import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import themeImages from "../themeImages";

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 4, justifyContent: "center" }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
          <Card
            onClick={() => onSelectCategory(category.id)}
            sx={{
              cursor: "pointer",
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={themeImages[category.name.split(":")[0]] || themeImages.Default}
              alt={category.name}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                textAlign: "center",
                p: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {category.name}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
