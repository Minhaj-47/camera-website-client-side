// sony cameras shown by card
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const SonyCamera = ({ products }) => {
  const { image, modelName, describtion, price, _id } = products;
  return (
    <div style={{ width: "95%" }}>
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
          <Link to={`/products/${_id}`} style={{ textDecoration: "none" }}>
            <Button variant="contained">
              <ShoppingCartIcon></ShoppingCartIcon>
              BUY NOW
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default SonyCamera;
