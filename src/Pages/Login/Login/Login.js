//this is login section
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
import { useLocation, useHistory } from "react-router-dom";

import Register from "../Register/Register";
import useFirebase from "../../../hooks/useFirebase";
import Header from "../../Shared/Header/Header";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [loginData, setLoginData] = useState({});
  const { user, loginUser, signInWithGoogle, isLoading, authError } =
    useFirebase();

  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, history);
    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, history);
  };
  //
  return (
    <>
      <Header></Header>
      {newUser ? (
        <Register location={location} setNewUser={setNewUser}></Register>
      ) : (
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
                login
              </Typography>
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  id="standard-basic"
                  label="Your Email"
                  name="email"
                  onChange={handleOnChange}
                  variant="standard"
                />
                <TextField
                  sx={{ width: "75%", m: 1 }}
                  id="standard-basic"
                  label="Your Password"
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  variant="standard"
                />

                <Button
                  sx={{ width: "75%", m: 1 }}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                <Button variant="text" onClick={() => setNewUser(true)}>
                  New User? Please Register
                </Button>
                {isLoading && <CircularProgress />}
                {user?.email && (
                  <Alert severity="success">Login successfully!</Alert>
                )}
                {authError && <Alert severity="error">{authError}</Alert>}
              </form>
              <p>------------------------</p>
              {
                <Button onClick={handleGoogleSignIn} variant="contained">
                  Google Sign In
                </Button>
              }
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
      )}
    </>
  );
};

export default Login;
