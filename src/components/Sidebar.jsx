import { useState } from "react";
import { Home, BarChart2, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({
  disableHover = false,
  forceCollapsed = false,
  onNavigate, // NEW
}) {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Reports", icon: <BarChart2 size={20} />, path: "/reports" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const isCollapsed = forceCollapsed ? true : collapsed;

  return (
    <div
      className={`h-screen bg-white  transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"}`}
      onMouseEnter={() =>
        !disableHover && !forceCollapsed && setCollapsed(false)
      }
      onMouseLeave={() =>
        !disableHover && !forceCollapsed && setCollapsed(true)
      }
    >
      {/* Logo */}
      <div className="flex items-center h-16 font-bold text-xl transition-all duration-300">
        <div
          className={`w-full h-full flex items-center ${
            isCollapsed
              ? "justify-center text-blue-500"
              : "justify-start bg-blue-500 text-white pl-4"
          }`}
        >
          {isCollapsed ? "🏢" : "MyCompany"}
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-2 flex flex-col gap-1 px-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                if (onNavigate) onNavigate(); // 🔥 closes sidebar on mobile
              }}
              className={`flex items-center gap-3 transition-all duration-200 rounded-lg
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
