import { useState } from "react";
import { Home, BarChart2, Settings, Users, ClipboardList, Group } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import react from "../assets/react.png";
import { useAuthUser } from "../utils/authUser";

export default function Sidebar({
  disableHover = false,
  forceCollapsed = false,
  onNavigate, // NEW
}) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useAuthUser();
  loading;
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Divisi", icon: <Group size={20} />, path: "/divisi" },
    { name: "Karyawan", icon: <Users size={20} />, path: "/karyawan" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Tasks", icon: <ClipboardList size={20} />, path: "/task" },
    { name: "Reports", icon: <BarChart2 size={20} />, path: "/reports" },
  ];

  const isCollapsed = forceCollapsed ? true : collapsed;

  return (
    <div
      className={`h-screen bg-white  transition-all duration-400 shadow
        ${isCollapsed ? "w-16" : "w-48"}`}
      onMouseEnter={() =>
        !disableHover && !forceCollapsed && setCollapsed(false)
      }
      onMouseLeave={() =>
        !disableHover && !forceCollapsed && setCollapsed(true)
      }
    >
      {/* Logo */}
      <div className="flex items-center h-14 font-semibold text-lg">
        <div
          className={`w-full h-full flex items-center ${
            isCollapsed
              ? "justify-center text-blue-500"
              : "justify-start bg-blue-500 text-white pl-4"
          }`}
        >
          {isCollapsed ? (
            <img
              src={react}
              alt=""
              className="filter brightness-0 w-[90%] aspect-square p-2"
            />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <p>CMLABS</p>{" "}
              <img src={react} alt="" className="w-[20%] aspect-square" />{" "}
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-2 flex flex-col gap-2 px-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                if (onNavigate) onNavigate(); // 🔥 closes sidebar on mobile
              }}
              className={`flex items-center gap-3 rounded-lg
                ${
                  active
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }
                ${
                  isCollapsed
                    ? "justify-center px-0 py-3"
                    : "justify-start px-3 py-2"
                }
              `}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
