import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-200 min-h-screen pt-10">
        <Outlet></Outlet>
      </div>

      <Footer />
    </>
  );
}

export default MainLayout;
