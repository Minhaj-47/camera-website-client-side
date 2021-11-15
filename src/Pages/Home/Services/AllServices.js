// all products are shown here
import { Typography } from "@mui/material";
import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import CanonCamera from "../../Allproducts/CanonCamera/CanonCamera";
import NikonCamera from "../../Allproducts/NikonCamera/NikonCamera";
import SonyCamera from "../../Allproducts/SonyCamera/SonyCamera";
import Header from "../../Shared/Header/Header";

const AllServices = () => {
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
  const [canonProducts, setCanonProducts] = useState([]);
  const [nikonProducts, setNikonProducts] = useState([]);
  const [sonyProducts, setSonyProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://morning-escarpment-37894.herokuapp.com/products")
      .then((data) => {
        const productsArray = data.data;
        console.log(productsArray);
        const nikonProduct = productsArray.filter(
          (product) => product.brand === "nikon"
        );
        console.log(nikonProduct);
        const canonProduct = productsArray.filter(
          (product) => product.brand === "canon"
        );
        const sonyProduct = productsArray.filter(
          (product) => product.brand === "sony"
        );
        setCanonProducts(canonProduct);
        setNikonProducts(nikonProduct);
        setSonyProducts(sonyProduct);
      });
  }, []);
  return (
    <div>
      <Header></Header>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          px: 2,
          my: 15,
          textTransform: "uppercase",
          textAlign: "center",
          color: "#45719d",
          borderBottom: 3,
          display: "inline-block",
          borderColor: "#1a237e",
        }}
      >
        All services
      </Typography>
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
          canon cameras
        </Typography>
        <div style={{ width: "100%" }}>
          <Slider
            {...settings}
            className=" z-0 "
            style={{ overflow: "hidden" }}
          >
            {canonProducts.map((products) => (
              <CanonCamera products={products} key={products._id}></CanonCamera>
            ))}
          </Slider>
        </div>
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
          nikon cameras
        </Typography>
        <div style={{ width: "100%" }}>
          <Slider
            {...settings}
            className=" z-0 "
            style={{ overflow: "hidden" }}
          >
            {nikonProducts.map((products) => (
              <NikonCamera products={products} key={products._id}></NikonCamera>
            ))}
          </Slider>
        </div>
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
          sony cameras
        </Typography>
        <div style={{ width: "100%" }}>
          <Slider
            {...settings}
            className=" z-0 "
            style={{ overflow: "hidden" }}
          >
            {sonyProducts.map((products) => (
              <SonyCamera products={products} key={products._id}></SonyCamera>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default AllServices;
