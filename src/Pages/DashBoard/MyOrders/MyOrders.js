//user order section ,here a user can see their orders and can also delete them if he like
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
import useFirebase from "../../../hooks/useFirebase";

const MyOrders = () => {
  const { user } = useFirebase();

  const [myOrders, setMyOrders] = useState([]);

  // fetching user orders by his email from database
  useEffect(() => {
    const url = `https://morning-escarpment-37894.herokuapp.com/myOrders/${user?.email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user?.email]);

  console.log(myOrders);
  // delete user order
  const handleCancelOrder = (id) => {
    const proceed = window.confirm("Are you sure want to delete the order ?");
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
            const reamainingServices = myOrders.filter(
              (service) => service._id !== id
            );
            setMyOrders(reamainingServices);
          }
        });
    }
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
        <ShoppingCartIcon></ShoppingCartIcon>
        You have booked total {myOrders?.length} products
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
            {myOrders?.map((row) => (
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
                {row.status === "pending" && (
                  <>
                    <TableCell align="center" sx={{ color: "red" }}>
                      {row.status}
                    </TableCell>
                    <Button
                      onClick={() => handleCancelOrder(row._id)}
                      sx={{ m: 3 }}
                      variant="outlined"
                      color="error"
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </>
                )}
                {row.status === "shipped" && (
                  <TableCell align="center" sx={{ color: "green" }}>
                    {row.status}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
