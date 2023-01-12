import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

const MainLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
