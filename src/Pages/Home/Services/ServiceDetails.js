// single service details is shown here
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";

const ServiceDetails = ({ service }) => {
  const { image, modelName, describtion, price } = service;
  return (
    <Grid item xs={12} sm={12} md={4}>
      <Card sx={{ minWidth: 275, border: 0, boxShadow: 3 }} margin="normal">
        <CardMedia
          component="img"
          style={{ width: "60%", margin: "0 auto" }}
          image={image}
          alt=""
        />
        <CardContent style={{ textAlign: "left" }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            {modelName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul>
              <li>{describtion.first}</li>
              <li>{describtion.second}</li>
              <li>{describtion.third}</li>
            </ul>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", paddingLeft: "30px" }}
          >
            {price} TAKA
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={`/products/${service._id}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained">
              <ShoppingCartIcon></ShoppingCartIcon>
              BUY NOW
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ServiceDetails;
