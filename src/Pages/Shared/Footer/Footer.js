import React from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: "#45719d",
  },
  linkItem: {
    color: "#fff",
    textDecoration: "none",
    marginRight: 15,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Footer = () => {
  const { root, linkItem } = useStyle();
  return (
    <div className={root}>
      <Container>
        <Grid container style={{ padding: "50px 0" }}>
          <Grid item md={12}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <List>
                <ListItem>
                  <Link className={linkItem} to="#">
                    About Our Website
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Explore our features
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Sign up to deliver
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Add your thoughts
                  </Link>{" "}
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Get help
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Read FAQs
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    View Products
                  </Link>{" "}
                </ListItem>
                <ListItem>
                  <Link className={linkItem} to="#">
                    Showroom near me
                  </Link>{" "}
                </ListItem>
              </List>
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px 0",
            borderTop: "1px solid gray",
          }}
        >
          <div>
            <Link className={linkItem} to="#">
              Private Policy
            </Link>
            <Link className={linkItem} to="#">
              Terms of Use
            </Link>
            <Link className={linkItem} to="#">
              Pricing
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
