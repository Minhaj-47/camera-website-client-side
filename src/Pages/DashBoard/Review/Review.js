// it is review section user can review our website and can rate also
import {
  Alert,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useFirebase from "../../../hooks/useFirebase";
import { Box } from "@mui/system";

const Review = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [userReview, setUserReview] = useState(false);
  const [value, setValue] = React.useState(2);
  console.log(value);

  const { user, isLoading } = useFirebase();

  const onSubmit = (data) => {
    data.rating = value;

    console.log(data);
    // posting user review in database
    axios
      .post("https://arcane-sierra-98556.herokuapp.com/reviews", data)
      .then((res) => {
        if (res.data.insertedId) {
          console.log(data);
          alert("added successfully");
          setUserReview(true);
          reset();
        }
      });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            height: "60%",
            width: "75%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              border: 1,
              borderRadius: "16px",
              boxShadow: 3,
              py: 3,
              m: 3,
              width: "90%",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                Review our site
              </Typography>
              <br />
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                defaultValue={user?.displayName}
                style={{
                  padding: "10px",
                  margin: "5px",
                  width: "80%",
                }}
              />

              <br />
              <textarea
                {...register("description")}
                placeholder="Write something about our web site"
                style={{
                  padding: "10px",
                  margin: "5px",
                  width: "80%",
                }}
              />
              <br />
              <Box sx={{ display: "flex", mx: 5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3}>
                    <Typography
                      variant="body1"
                      sx={{ color: "#45719d", fontWeight: "bold" }}
                    >
                      Give us rating:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1}>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <br />
              {errors.exampleRequired && <span>This field is required</span>}
              <input
                type="submit"
                value="Submit Review"
                style={{
                  width: "50%",
                  backgroundColor: "#1976d2",
                  outline: "none",
                  border: "none",
                  borderRadius: "15px",
                  padding: "5px",
                  color: "white",
                  marginTop: "10px",
                }}
              />
            </form>
            {userReview && (
              <Alert severity="success">Review Added successfully!</Alert>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Review;
