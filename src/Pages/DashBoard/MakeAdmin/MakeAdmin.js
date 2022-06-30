//admin can make an existing user admin
import React, { useState } from "react";
import { Alert, Button, TextField, Container, Typography } from "@mui/material";
import useFirebase from "../../../hooks/useFirebase";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [addedAdmin, setAddedAdmin] = useState(false);
  const { token } = useFirebase();

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };

  // storing the new admin in user database
  const handleAdminSubmit = (e) => {
    const user = { email };

    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          console.log(data);
          setAddedAdmin(true);
        }
      });
    e.preventDefault();
  };
  console.log(addedAdmin);

  return (
    <Container>
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
        make admin
      </Typography>
      <form onSubmit={handleAdminSubmit}>
        <TextField
          sx={{ width: "50%" }}
          label="Email"
          type="email"
          onBlur={handleOnBlur}
          variant="standard"
        />
        <br />
        <Button type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
      <br />
      {addedAdmin && <Alert severity="success">Made Admin successfully!</Alert>}
    </Container>
  );
};

export default MakeAdmin;
