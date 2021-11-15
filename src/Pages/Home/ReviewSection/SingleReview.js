// single review means each single reviews architecture build here
import React from "react";
import Paper from "@mui/material/Paper";
import { Rating, Typography } from "@mui/material";
const SingleReview = ({ review }) => {
  console.log(review);
  return (
    <div>
      <Paper
        variant="outlined"
        sx={{
          elevation: 3,
          p: 3,
          fontWeight: "bold",
          boxShadow: 3,
          width: "80%",
        }}
      >
        <div>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {review.name}
          </Typography>
          <div>
            <Typography variant="body1">{review.description}</Typography>
            <Rating
              name="read-only"
              value={review.rating}
              readOnly
              precision={0.5}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default SingleReview;
