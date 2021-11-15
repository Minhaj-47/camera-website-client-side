//register section new user register here
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import useFirebase from "../../../hooks/useFirebase";
import { useHistory } from "react-router-dom";

const Register = ({ setNewUser, location }) => {
  //
  const [loginData, setLoginData] = useState({});
  const { registerUser, isLoading, user, authError } = useFirebase();
  const history = useHistory();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    console.log(newLoginData);
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    if (loginData?.password !== loginData?.password2) {
      alert("Your password did not match");
      return;
    }
    console.log(loginData);
    registerUser(
      loginData.email,
      loginData.password,
      loginData.name,
      location,
      history
    );
    e.preventDefault();
  };
  //
  return (
    <Container>
      <Grid container spacing={2} style={{ height: "100vh" }}>
        <Grid item sx={{ mt: 8 }} xs={12} md={6}>
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
            register
          </Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Name"
              name="name"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Email"
              name="email"
              type="email"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="Your Password"
              type="password"
              name="password"
              onBlur={handleOnBlur}
              variant="standard"
            />
            <TextField
              sx={{ width: "75%", m: 1 }}
              id="standard-basic"
              label="ReType Your Password"
              type="password"
              name="password2"
              onBlur={handleOnBlur}
              variant="standard"
            />

            <Button
              sx={{ width: "75%", m: 1 }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>

            <Button variant="text" onClick={() => setNewUser(false)}>
              Already Registered? Please Login
            </Button>
          </form>
          {isLoading && <CircularProgress />}
          {user?.email && (
            <Alert severity="success">User Created successfully!</Alert>
          )}
          {authError && <Alert severity="error">{authError}</Alert>}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{ width: "100%" }}
            src="https://i.ibb.co/t4LhpLH/travel-still-life-pack-top-view.jpg"
            alt=""
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
