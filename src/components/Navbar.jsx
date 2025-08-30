import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Cari from "../assets/search.png";
import { useAuthUser } from "../utils/authUser";
import { useNavigate } from "react-router-dom";
import { useNotifikasiContext } from "../store/notifikasi.context";


export default function Navbar({ onToggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, userLogin, loading } = useAuthUser();
  const { notifikasi } = useNotifikasiContext();
  const unreadCount = notifikasi.filter((item) => !item.status).length;

  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return;
    if (user === null) {
      navigate("/sign-in");
    } else if (userLogin === null) {
      navigate("/settings");
    }
  },);

  return (
    <nav className="bg-white shadow px-4 py-2 flex items-center justify-between">
      {/* Left side: Hamburger (mobile only) + Search */}
      <div className="flex items-center space-x-3 w-1/2">
        {/* Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Search box */}
        <div className="flex items-center relative w-[40%] h-full p2">
          <img
            src={Cari}
            alt=""
            className="w-[15px] aspect-square absolute right-2"
          />
          <input
            type="text"
            placeholder="Search task.."
            className="w-full rounded-xl border-none h-full bg-gray-100 px-4 py-1 font-semibold ring-0  focus:border-none ring-gray-100  focus:ring-1 focus:ring-gray-200 "
          />
        </div>
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
            {unreadCount > 0 && (
              <p className="text-xs text-blue-500 font-medium">
              {unreadCount} new
              </p>
            )}
            
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl p-4 z-10 border">
              <p className="text-base font-semibold border-b pb-2 flex justify-between items-center">
                Notifications
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              </p>
              <ul className="mt-3 space-y-3 text-sm max-h-64 overflow-y-auto">
                {[...notifikasi].reverse().map((item) => (
                  <li
                    key={item.id}
                    className={`p-3 rounded-md border-l-4 transition 
                      ${item.status
                        ? "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        : "border-blue-500 bg-blue-50 hover:bg-blue-100"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item.judul}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative flex items-center gap-1">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
