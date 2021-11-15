// it is contact section
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import React from "react";

const Contact = () => {
  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          px: 2,
          my: 3,
          textTransform: "uppercase",
          textAlign: "center",
          color: "#45719d",
          borderBottom: 3,
          display: "inline-block",
          borderColor: "#1a237e",
        }}
      >
        Contact us
      </Typography>
      <Grid container spacing={2} sx={{ my: 6, overflow: "hidden" }}>
        <Grid item xs={6} sm={8} md={6}>
          <img
            sx={{ width: "100%", px: 3 }}
            src="https://i.ibb.co/8bMqpgS/retro-cameras-144627-12214-min.jpg"
            alt=""
          />
        </Grid>
        <Grid item xs={8} sm={8} md={6}>
          <Box>
            <Container>
              <TextField
                fullWidth
                placeholder="Email"
                margin="normal"
                required
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <TextField
                fullWidth
                placeholder="Subject"
                margin="normal"
                required
                sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              />
              <textarea
                style={{ width: "100%" }}
                rows={10}
                placeholder="Your Message"
              ></textarea>
              <br />
              <Button variant="contained" sx={{ backgroundColor: "#45719d" }}>
                Submit
              </Button>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
