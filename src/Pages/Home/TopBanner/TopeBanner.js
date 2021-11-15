import { Grid, Typography } from "@mui/material";
import React from "react";

const TopeBanner = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 6 }}>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            px: 2,
            textTransform: "uppercase",
            textAlign: "left",
            color: "#45719d",
          }}
        >
          <span style={{ color: "#1a237e" }}> Capture </span>
          <br /> your memory with our lens
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img
          style={{ width: "100%" }}
          src="https://i.ibb.co/QfDdG5g/close-up-vintage-camera-white-background-min.jpg"
          alt=""
        />
      </Grid>
    </Grid>
  );
};

export default TopeBanner;
