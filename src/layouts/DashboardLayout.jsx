import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (mobile overlay) */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile sidebar (collapsed only) */}
        <div className="w-13 bg-white shadow-lg">
          <Sidebar
            disableHover
            forceCollapsed
            onNavigate={() => setSidebarOpen(false)} // 🔥 auto close
          />
        </div>

        {/* Dark overlay */}
        {sidebarOpen && (
          <div
            className="flex-1 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>

      {/* Sidebar (desktop with hover expand) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-w-0">
        <div className="flex flex-col flex-1 min-w-0">
          {/* Navbar with toggle */}
          <div className="sticky top-0 z-30">
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          <main className="flex-1 p-4 overflow-y-auto min-w-0 custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
