// manage products section here admin can monitor all users order and can delete or update status from pending to shipped
import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageAllOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetching all user orders from database
  useEffect(() => {
    setIsLoading(true);
    const url = `https://morning-escarpment-37894.herokuapp.com/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
        setIsLoading(false);
      });
  }, []);

  // deleting a paricular order
  const handleCancelOrder = (id) => {
    const proceed = window.confirm(
      "Are you sure,about canceling this users order ?"
    );
    if (proceed) {
      const url = `https://morning-escarpment-37894.herokuapp.com/deleteOrder/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("successfully canceled...");
            const reamainingServices = userOrders.filter(
              (service) => service._id !== id
            );
            setUserOrders(reamainingServices);
          }
        });
    }
  };
  // updating order status to shipped
  const handleOrderStatus = (id) => {
    console.log(id);
    const updatedorder = userOrders.find((order) => order._id === id);
    updatedorder.status = "shipped";

    const url = `https://morning-escarpment-37894.herokuapp.com/approve/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedorder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Approved Successfully");

          const remaining = userOrders.filter((order) => order._id !== id);
          remaining.push(updatedorder);
          setUserOrders(remaining);
        }
      });
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress></CircularProgress>
      ) : (
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
            <ShoppingCartIcon></ShoppingCartIcon> There are {userOrders?.length}{" "}
            products
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="my orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.productName}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.adress}</TableCell>
                    <TableCell align="center">{row.phoneNumber}</TableCell>

                    {row?.status === "pending" ? (
                      <TableCell
                        style={{ color: "red", fontWeight: "bold" }}
                        align="center"
                      >
                        {row.status}
                      </TableCell>
                    ) : (
                      <TableCell
                        style={{ color: "green", fontWeight: "bold" }}
                        align="center"
                      >
                        {row.status}
                      </TableCell>
                    )}

                    {row?.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleOrderStatus(row._id)}
                          sx={{ m: 2 }}
                          variant="outlined"
                          color="success"
                        >
                          Confirm
                        </Button>
                        <Button
                          onClick={() => handleCancelOrder(row._id)}
                          sx={{ m: 2 }}
                          variant="outlined"
                          color="error"
                        >
                          <DeleteIcon></DeleteIcon>
                        </Button>
                      </>
                    ) : (
                      <Typography
                        style={{
                          color: "green",
                          fontWeight: "bolder",
                          paddingTop: "10px",
                        }}
                      >
                        order shipped
                      </Typography>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default ManageAllOrders;
