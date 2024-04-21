import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
