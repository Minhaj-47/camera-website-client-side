// it is dashboard section where admin and user can see different routes
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import useFirebase from "../../../hooks/useFirebase";
import DashBoardHome from "../DashBoardHome/DashBoardHome";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import Pay from "../Pay/Pay";
import AddProduct from "../AddProduct/AddProduct";
import Review from "../Review/Review";
import MyOrders from "../MyOrders/MyOrders";
import ManageAllOrders from "../ManageAllOrders/ManageAllOrders";
import ManageProducts from "../ManageProducts/MangeProducts";

const drawerWidth = 270;

function Dashboard(props) {
  const { window } = props;
  window?.location.reload();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { logout, admin, isLoading } = useFirebase();

  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      {/* drawer links for different route */}
      <Link style={{ textDecoration: "none", color: "#45719d" }} to="/">
        <Button color="inherit">Go to Home</Button>
      </Link>
      <Divider />

      <Link
        style={{ textDecoration: "none", color: "#45719d" }}
        to="/allProducts"
      >
        <Button color="inherit">Our Products</Button>
      </Link>
      <Divider />
      {/* only admin can access some following routes below shown by conditional rendering */}
      {admin ? (
        <Box>
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/makeAdmin`}
          >
            <Button color="inherit">Make Admin</Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/addProduct`}
          >
            <Button color="inherit">Add Product</Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/manageOrders`}
          >
            <Button color="inherit">Manage all orders</Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/manageProducts`}
          >
            <Button color="inherit">Manage Products</Button>
          </Link>
        </Box>
      ) : (
        <Box>
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/pay`}
          >
            <Button color="inherit">Pay</Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/myOrders`}
          >
            <Button color="inherit">My Orders</Button>
          </Link>
          <br />
          <Link
            style={{ textDecoration: "none", color: "#45719d" }}
            to={`${url}/review`}
          >
            <Button color="inherit">Give a Review</Button>
          </Link>
        </Box>
      )}
      <Divider />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button onClick={logout} color="inherit">
        Logout{" "}
      </Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
              }}
            >
              <Toolbar />

              {!admin ? (
                <Switch>
                  <Route exact path={path}>
                    <DashBoardHome></DashBoardHome>
                  </Route>
                  <Route path={`${path}/pay`}>
                    <Pay></Pay>
                  </Route>
                  <Route path={`${path}/myOrders`}>
                    <MyOrders></MyOrders>
                  </Route>
                  <Route path={`${path}/review`}>
                    <Review></Review>
                  </Route>
                </Switch>
              ) : (
                <Switch>
                  <Route exact path={`${path}/makeAdmin`}>
                    <MakeAdmin></MakeAdmin>
                  </Route>
                  <Route path={`${path}/addProduct`}>
                    <AddProduct></AddProduct>
                  </Route>
                  <Route path={`${path}/manageOrders`}>
                    <ManageAllOrders></ManageAllOrders>
                  </Route>
                  <Route path={`${path}/manageProducts`}>
                    <ManageProducts></ManageProducts>
                  </Route>
                </Switch>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;

// color: '#45719d',
