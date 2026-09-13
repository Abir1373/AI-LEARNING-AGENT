import React from "react";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.jpg";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 flex flex-col">
      <Navbar />
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image side */}
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <img
              src={authImg}
              alt="Authentication"
              className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-base-content/5 object-cover transform group-hover:scale-[1.02] transition duration-500"
            />
          </div>

          {/* Form side */}
          <div className="order-1 lg:order-2 mt-4">
            <div className="bg-base-100/80 backdrop-blur-xl border border-base-content/10 rounded-3xl shadow-xl p-8 sm:p-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
