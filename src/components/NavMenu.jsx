import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavMenu() {

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Chandra
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium">

            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>

         

            <Link to="/login" className="hover:text-indigo-600 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-indigo-600 transition">
              Register
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-white shadow-lg">

          <div className="flex flex-col text-center py-4 space-y-4">

            <Link to="/" onClick={()=>setOpen(false)} className="hover:text-indigo-600">
              Home
            </Link>

            <Link to="/login" onClick={()=>setOpen(false)} className="hover:text-indigo-600">
              Login
            </Link>

            <Link to="/register" onClick={()=>setOpen(false)} className="hover:text-indigo-600">
              Register
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
}