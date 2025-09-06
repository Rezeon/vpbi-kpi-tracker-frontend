import { useEffect } from "react";
import { Menu } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Cari from "../assets/search.png";
import { useAuthUser } from "../utils/authUser";
import { useNavigate } from "react-router-dom";
import Notification from "./notification/Notification"


export default function Navbar({ onToggleSidebar }) {
  const { user, userLogin, loading } = useAuthUser();

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
      <Notification />
      
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

