import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import AddPropertyPage from "../Pages/AddPropertyPage";
import SellPage from "../Pages/SellPage";
import BuyPage from "../Pages/BuyPage";
import WishListPage from "../Pages/WishListPage";

function PageRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/addProperty/:id" element={<AddPropertyPage />} />
      <Route path="/addProperty" element={<AddPropertyPage />} />
      <Route path="/buy" element={<BuyPage />} />
      <Route path="/sell" element={<SellPage />} />
      <Route path="/wishlist" element={<WishListPage />} />

    </Routes>
  );
}

export default PageRoute;
