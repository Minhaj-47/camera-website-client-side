//6 services from the database shown in home page
import { Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ServiceDetails from "./ServiceDetails";

const Services = () => {
  const [serviceLoading, setServiceLoading] = useState(true);
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServiceLoading(true);
    axios
      .get("https://morning-escarpment-37894.herokuapp.com/products")
      .then((data) => {
        setServices(data.data);
        setServiceLoading(false);
      });
  }, []);

  return (
    <>
      {serviceLoading ? (
        <CircularProgress />
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
            Services
          </Typography>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {services.slice(0, 6).map((service) => (
              <ServiceDetails
                service={service}
                key={service._id}
              ></ServiceDetails>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Services;
