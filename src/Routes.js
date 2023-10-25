import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./Components/Common/NotFound";
import Welcome from "./Components/Common/WelcomePage";
import Home from "./Components/HomePage/Home.js";
import BidConfirmation from "./Components/Products/BidConfirmation";
import ProductDetails from "./Components/Products/ProductDetails";
import ProductsList from "./Components/Products/ProductsList";
import Seed from "./Components/Products/Seed";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Signup from "./Components/User/Signup";

/** All routes of website along with a catch all route to display a not found route */

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route exact path="/products">
          <ProductsList />
        </Route>
        <Route exact path="/bidPlaced">
          <BidConfirmation />
        </Route>
        <Route exact path="/Seed">
          <Seed />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
