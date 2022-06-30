//all user review are shown here
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

import SingleReview from "./SingleReview";
import { Typography } from "@mui/material";
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("https://arcane-sierra-98556.herokuapp.com/reviews")
      .then((data) => {
        setReviews(data.data);
      });
  }, []);
  // console.log(reviews);
  var settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

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
        Reviews
      </Typography>
      <Slider {...settings} className=" z-0 " style={{ overflow: "hidden" }}>
        {reviews.map((review) => (
          <SingleReview review={review} key={review._id}></SingleReview>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSection;
<h1>this is review </h1>;
