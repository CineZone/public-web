import React from "react";
// components

import Sidebar from "./SideBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="md:ml-56 min-h-screen pb-10 overflow-y-hidden">
        <div className="mx-auto w-full">{children}</div>
      </div>
    </>
  );
}
