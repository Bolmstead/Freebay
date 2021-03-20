import { Switch, Route  } from "react-router-dom";
import React  from "react";
import Home from "./Components/HomePage/Home.js";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import Welcome from "./Components/Common/WelcomePage";
import NotFound from "./Components/Common/NotFound";
import BidConfirmation from "./Components/Common/BidConfirmation";
import ProductsCategoryList from "./Components/Products/ProductsCategoryList";
import ProductsSearchResults from "./Components/Products/ProductsSearchResults";
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
            <Route exact path="/welcome">
                <Welcome />
            </Route>
            <Route exact path="/products" >
                <ProductsCategoryList />
            </Route>
            <Route exact path="/products/searchResults" >
                <ProductsSearchResults />
            </Route>
            <Route exact path="/bidPlaced/:id" >
                <BidConfirmation />
            </Route>
            <Route exact path="/product/:id">
                <ProductDetails />
            </Route>
            <Route exact path="/profile/:username">
                <Profile />
            </Route>
        
            <Route><NotFound/></Route>
        </Switch>
    </div>
  );
}

export default Routes;
