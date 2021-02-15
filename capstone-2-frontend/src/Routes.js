import './App.css';
import { Switch, Route  } from "react-router-dom";
import React  from "react";

import Home from "./Home";
import Login from "./Components/Login";
import ProductCard from "./Components/Products/ProductCard";
import Signup from "./Components/Signup";
import Profile from "./Components/User/Profile";

import ProductList from "./Components/Products/ProductList";
import ProductCategoryList from "./Components/Products/ProductCategoryList";
import ProductDetails from "./Components/Products/ProductDetails";


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
            <Route exact path="/products" >
                <ProductList />
            </Route>
            <Route exact path="/product/:id">
                <ProductDetails />
            </Route>
            <Route exact path="/profile/:username">
                <Profile />
            </Route>
        
            <Route><h1>Not Found!</h1></Route>
        </Switch>
    </div>
  );
}

export default Routes;
