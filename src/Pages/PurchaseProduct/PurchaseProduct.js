// product purchase page wher user purchase a product by submitting his additonal information
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import { Box } from "@mui/system";

const PurchaseProduct = () => {
  const [confirmOrder, setConfirmOrder] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const { user, isLoading } = useFirebase();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("https://morning-escarpment-37894.herokuapp.com/products")
      .then((data) => {
        const productsArray = data.data;
        const filterProduct = productsArray.filter(
          (products) => products._id === productId
        );
        setProduct(filterProduct);
      });
  }, []);
  const history = useHistory();
  const onSubmit = (data) => {
    data.productName = product[0].modelName;
    data.status = "pending";
    fetch("https://morning-escarpment-37894.herokuapp.com/addOrders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setConfirmOrder(true);
      });
    console.log(data);
  };
  console.log(product[0]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {confirmOrder ? (
            <>
              <Alert severity="success">Your order is succesfull</Alert>
              <Button onClick={() => history.push("/")}>Go back home ?</Button>
            </>
          ) : (
            <Box>
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Card
                      sx={{
                        minWidth: 275,
                        border: 0,
                        boxShadow: 3,
                        width: "80%",
                        m: 3,
                      }}
                      margin="normal"
                    >
                      <CardMedia
                        component="img"
                        style={{ width: "50%", margin: "0 auto" }}
                        image={product[0]?.image}
                        alt=""
                      />
                      <CardContent style={{ textAlign: "left" }}>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {product[0]?.modelName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <ul>
                            <li>{product[0]?.describtion.first}</li>
                            <li>{product[0]?.describtion.second}</li>
                            <li>{product[0]?.describtion.third}</li>
                          </ul>
                        </Typography>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold", paddingLeft: "30px" }}
                        >
                          {product[0]?.price} TAKA
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box>
                      <Typography
                        variant="h6"
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
                        confirm purchase
                      </Typography>
                      <Box
                        sx={{
                          border: 1,
                          borderRadius: "16px",
                          boxShadow: 3,
                          p: 5,
                          mx: 3,
                        }}
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input
                            {...register("productName")}
                            placeholder="Camera Name"
                            defaultValue={product[0]?.modelName}
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "70%",
                            }}
                          />
                          <br />
                          <input
                            {...register("name", { required: true })}
                            placeholder="Name"
                            defaultValue={user?.displayName}
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "70%",
                            }}
                          />
                          <br />
                          <input
                            {...register("email", { required: true })}
                            defaultValue={user?.email}
                            placeholder="User email"
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "70%",
                            }}
                          />
                          <br />
                          <input
                            {...register("adress", { required: true })}
                            placeholder="adress"
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "70%",
                            }}
                          />
                          <br />
                          <input
                            {...register("phoneNumber", { required: true })}
                            placeholder="Phone number"
                            type="number"
                            style={{
                              padding: "5px",
                              margin: "5px",
                              width: "70%",
                            }}
                          />
                          <br />
                          {errors.exampleRequired && (
                            <span>This field is required</span>
                          )}
                          <input
                            type="submit"
                            value="Order now"
                            style={{
                              width: "20%",
                              backgroundColor: "#45719d",
                              outline: "none",
                              border: "none",
                              borderRadius: "15px",
                              padding: "5px",
                              color: "white",
                              marginTop: "10px",
                            }}
                          />
                        </form>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default PurchaseProduct;
