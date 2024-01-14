import React, { ReactNode } from "react";
import Navbar from "./Navbar";

const LayoutComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
    <>
    <Navbar />
    {children}
    </>
  )
}

export default LayoutComponent