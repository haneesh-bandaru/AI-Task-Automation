import { authContext } from "@/App";
import Menu from "@/components/Menu";
import React, { useContext, useState } from "react";

const AdminLayout = ({ children }) => {

const [isLoggedIn,setIsLoggedIn] = useContext(authContext);
  return (
    <div className="h-screen w-screen flex">
      {isLoggedIn && <Menu />}
      {children}
    </div>
  );
};

export default AdminLayout;
