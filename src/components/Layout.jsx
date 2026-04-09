import React, { useState } from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        <SideBar open={open} setOpen={setOpen} />
      </aside>

      {/* Content */}
      <div className="flex flex-col flex-1 w-full">

        {/* Mobile Header */}
        <header className="flex items-center p-4 bg-white shadow lg:hidden">
          <button onClick={() => setOpen(true)}>
            ☰
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;