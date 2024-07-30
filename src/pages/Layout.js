import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
