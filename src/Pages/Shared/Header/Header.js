// navbar
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import useFirebase from "../../../hooks/useFirebase";

export default function Header() {
  const theme = useTheme();
  const { user, logout } = useFirebase();
  const useStyle = makeStyles({
    navItem: {
      color: "#fff",
      textDecoration: "none",
    },
    navIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none !important",
      },
    },
    navItemContainer: {
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
    navLogo: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "right",
      },
      [theme.breakpoints.up("sm")]: {
        textAlign: "left",
      },
    },
  });
  const { navItem, navIcon, navItemContainer, navLogo } = useStyle();
  const [state, setState] = React.useState(false);

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button>
          <Divider></Divider>
          <ListItemText>
            <Link to="/" style={{ color: "#000", textDecoration: "none " }}>
              Home
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <Divider></Divider>
          <ListItemText>
            <Link
              to="/allProducts"
              style={{ color: "#000", textDecoration: "none " }}
            >
              Explore More
            </Link>
          </ListItemText>
        </ListItem>

        {user?.email ? (
          <Box>
            <ListItem button>
              <Divider></Divider>
              <ListItemText>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/dashboard"
                >
                  <Button color="inherit">Dashboard</Button>
                </NavLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <Divider></Divider>
              <ListItemText>sign in as:{user?.displayName}</ListItemText>
            </ListItem>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </Box>
        ) : (
          <ListItem button>
            <Divider></Divider>
            <ListItemText>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            </ListItemText>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#45719d",
            position: "fixed",
            top: 0,
            zIndex: 100,
          }}
          fixed
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              className={navIcon}
              onClick={() => setState(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className={navLogo}
            >
              <img
                src="https://i.ibb.co/VpL4HhD/attachment-55044806-modified.png"
                alt=""
                style={{ width: "50px", paddingTop: "10px" }}
              />
            </Typography>
            <Box className={navItemContainer} sx={{ display: "flex" }}>
              <Link to="/" className={navItem}>
                <Button color="inherit">Home</Button>
              </Link>
              <Link to="/allProducts" className={navItem}>
                <Button color="inherit">Explore More</Button>
              </Link>
              {user?.email ? (
                <Box>
                  <NavLink
                    style={{ textDecoration: "none", color: "white" }}
                    to="/dashboard"
                  >
                    <Button color="inherit">Dashboard</Button>
                  </NavLink>

                  <Button onClick={logout} color="inherit">
                    Logout
                  </Button>
                  <span>
                    <span>sign in as: {user?.displayName}</span>
                  </span>
                </Box>
              ) : (
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  <Button color="inherit">Login</Button>
                </NavLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <React.Fragment>
          <Drawer open={state} onClose={() => setState(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}
