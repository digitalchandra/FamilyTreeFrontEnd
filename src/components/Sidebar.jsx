
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
  LogOut,
  Menu,
  X
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

const SideBar = ({ open, setOpen }) => {

  const navigate = useNavigate();

  const logout = () => {
    TokenService.removeToken();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between p-4 border-b bg-white">
       

        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}


        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b font-bold text-lg">
          हाम्रो बंशावली

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t space-y-2">

          <Link
            to="/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
          >
            <Settings size={20} />
            Settings
          </Link>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-100"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>


    </>
  );
};

export default SideBar;