import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AuthLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-blue-50 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default AuthLayout;
