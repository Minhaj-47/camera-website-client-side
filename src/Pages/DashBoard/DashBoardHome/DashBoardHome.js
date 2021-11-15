import * as React from "react";
import MyOrders from "../MyOrders/MyOrders";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const DashboardHome = () => {
  return (
    <div>
      <Typography paragraph>
        <Grid item xs={8}>
          <MyOrders></MyOrders>
        </Grid>
      </Typography>
    </div>
  );
};

export default DashboardHome;
