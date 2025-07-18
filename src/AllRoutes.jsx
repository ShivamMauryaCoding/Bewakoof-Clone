import React from "react";
import { Route, Routes } from "react-router-dom";
import DescriptionPage from "./Pages/DescriptionPage";
import HomePage from "./Pages/HomePage";
import AddToCartPage from "./components/AddToCart";
import MenPage from "./Pages/MenPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";


function AllRoutes() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/"></Route>
      <Route element={<DescriptionPage />} path="/description/:id"></Route>
      <Route element={<AddToCartPage />} path="/addtocart"></Route>
      <Route element={<MenPage />} path="/men"></Route>

      <Route element={<DescriptionPage />} path="/men/:id"></Route>
      <Route element={<Login />} path="/login"></Route>
      <Route element={<Signup />} path="/signup"></Route>
    </Routes>
  );
}

export default AllRoutes;
