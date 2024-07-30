import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <main>
      <h1>Twinleaves</h1>
      <Outlet />
    </main>
  );
};

export default Layout;
