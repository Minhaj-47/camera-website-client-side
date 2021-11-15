// all products are shown here by card and admin can delete any of this product
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CardActions,
  CircularProgress,
  Container,
} from "@mui/material";

import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

const ManageProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetching all products data
  useEffect(() => {
    setIsLoading(true);
    fetch("https://morning-escarpment-37894.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false);
      });
  }, []);
  // delete selected product
  const handleDelete = (id) => {
    const url = `https://morning-escarpment-37894.herokuapp.com/products/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          alert(" product deleted");
          const remaining = allProducts.filter((service) => service._id !== id);
          setAllProducts(remaining);
        }
      });
  };

  return (
    <Container>
      {!isLoading ? (
        <Box>
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
            All products
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {allProducts.map((product) => (
              <Grid item xs={12} sm={12} md={4}>
                <Card
                  sx={{ minWidth: 275, border: 0, boxShadow: 3 }}
                  margin="normal"
                >
                  <CardMedia
                    component="img"
                    style={{ width: "60%", margin: "0 auto" }}
                    image={product.image}
                    alt=""
                  />
                  <CardContent style={{ textAlign: "left" }}>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.modelName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <ul>
                        <li>{product.describtion.first}</li>
                        <li>{product.describtion.second}</li>
                        <li>{product.describtion.third}</li>
                      </ul>
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", paddingLeft: "30px" }}
                    >
                      {product.price} TAKA
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => handleDelete(product._id)}
                      color="error"
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default ManageProducts;
