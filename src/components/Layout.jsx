import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className="flex w-full h-screen p-6 overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;