import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AllServices from "./Pages/Home/Services/AllServices";
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";
import PurchaseProduct from "./Pages/PurchaseProduct/PurchaseProduct";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import DashBoard from "./Pages/DashBoard/DashBoard/DashBoard";
import ManageAllOrders from "./Pages/DashBoard/ManageAllOrders/ManageAllOrders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/allproducts">
            <AllServices></AllServices>
          </Route>
          <Route path="/ss">
            <ManageAllOrders></ManageAllOrders>
          </Route>
          <PrivateRoute exact path="/products/:productId">
            <PurchaseProduct></PurchaseProduct>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <DashBoard></DashBoard>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
