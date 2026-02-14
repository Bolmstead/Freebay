import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Components/Common/NotFound";
import Welcome from "./Components/Common/WelcomePage";
import Home from "./Components/HomePage/Home.jsx";
import BidConfirmation from "./Components/Products/BidConfirmation";
import ProductDetails from "./Components/Products/ProductDetails";
import ProductsList from "./Components/Products/ProductsList";
import Seed from "./Components/Products/Seed";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import Signup from "./Components/User/Signup";

/** All routes of website along with a catch all route to display a not found route */

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/bidPlaced" element={<BidConfirmation />} />
        <Route path="/Seed" element={<Seed />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
