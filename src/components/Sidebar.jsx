import React from "react";
import TokenService from "../utils/TokenService";
import { useNavigate, Link } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  History,
  Landmark,
  Flower,
  Calendar,
  UserCircle,
  Settings,
  LogOut
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "बंशावली", icon: Users, path: "/family" },
  { name: "हाम्रो इतिहास", icon: History, path: "/history" },
  { name: "हाम्रो परम्परा", icon: Landmark, path: "/tradition" },
  { name: "हाम्रो संस्कृति", icon: Flower, path: "/culture" },
  { name: "कुल देवता र पुजा बिधिहरु", icon: Landmark, path: "/kul-devta" },
  { name: "चाड पर्ब", icon: Calendar, path: "/festival" },
  { name: "प्रयोग कर्ताहरु", icon: UserCircle, path: "/users" },
];

const SideBar = () => {

  const navigate = useNavigate();

  const logout = () => {
    TokenService.removeToken();
    navigate("/");
  };

  return (
    <div className="flex flex-col">

      {/* Logo */}
      <div className="p-6 text-xl font-bold border-b">
       हाम्रो बंशावली
       
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 ">

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t space-y-2">

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </div>
  );
};

export default SideBar;