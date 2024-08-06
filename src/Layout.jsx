import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div style={{ overflowX: "scroll" }} className="flex-grow p-4 w-auto ">
        {/* children routes are rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
