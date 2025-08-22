import { useState } from "react";
import { Bell, Menu } from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-white shadow px-4 py-2 flex items-center justify-between">
      {/* Left side: Hamburger (mobile only) + Search */}
      <div className="flex items-center space-x-3 w-1/3">
        {/* Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Search box */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right side: Notifications + Profile */}
      <div className="flex items-center space-x-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
              <p className="text-sm font-semibold">Notifications</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="border-b pb-2">New user registered</li>
                <li className="border-b pb-2">Order #1002 pending</li>
                <li>System update available</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full border"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
