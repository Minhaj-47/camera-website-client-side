// add product section where admin can add a product
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Alert, Typography, Box, CircularProgress } from "@mui/material";
import useFirebase from "../../../hooks/useFirebase";

const AddProduct = () => {
  const { isLoading } = useFirebase();

  const [addedProduct, setAddedProduct] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // stored added product details in database by thin onSubmit
  const onSubmit = (data) => {
    const newProductData = {
      brand: data.brand,
      modelName: data.modelName,
      image: data.image,
      price: data.price,
      describtion: {
        first: data.describtion1,
        second: data.describtion2,
        third: data.describtion3,
      },
    };
    console.log(data);
    console.log(newProductData);
    axios
      .post(
        "https://arcane-sierra-98556.herokuapp.com/products",
        newProductData
      )
      .then((res) => {
        if (res.data.insertedId) {
          alert("added successfully");
          setAddedProduct(true);
          reset();
        }
      });
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
            add new product
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
                {...register("modelName", { required: true })}
                placeholder="Camera model"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />
              <select
                {...register("brand")}
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
                placeholder="choose a brand"
              >
                <option value="canon">canon</option>
                <option value="nikon">nikon</option>
                <option value="sony">sony</option>
              </select>
              <br />
              <input
                {...register("describtion1", { required: true })}
                placeholder="first describtion"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />
              <input
                {...register("describtion2", { required: true })}
                placeholder="second describtion"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />
              <input
                {...register("describtion3", { required: true })}
                placeholder="third describtion"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />
              <input
                {...register("image", { required: true })}
                placeholder="give a image link"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />

              <input
                {...register("price", { required: true })}
                placeholder="Product price"
                type="number"
                style={{
                  padding: "5px",
                  margin: "5px",
                  width: "70%",
                }}
              />
              <br />
              {errors.exampleRequired && <span>This field is required</span>}
              <input
                type="submit"
                value="Add the product"
                style={{
                  width: "50%",
                  backgroundColor: "#45719d",
                  outline: "none",
                  border: "none",
                  borderRadius: "15px",
                  padding: "8px",
                  color: "white",
                  marginTop: "10px",
                }}
              />
            </form>
          </Box>
          <br />
          {addedProduct && (
            <Alert severity="success">add product successfully</Alert>
          )}
        </Box>
      )}
    </div>
  );
};

export default AddProduct;
