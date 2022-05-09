import React, { FC } from "react";
import NavBar from "./NavBar";

type LayoutProp = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProp> = ({ children }) => {
  return (
    <div className="wrapper">
      <NavBar />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
