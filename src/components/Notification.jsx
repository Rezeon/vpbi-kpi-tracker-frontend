import { useNotifikasiContext } from "../store/notifikasi.context";
import { useState } from "react";
import { Bell } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useAuthUser } from "../utils/authUser"; 





export default function Notification() {

  const [showNotifications, setShowNotifications] = useState(false);
  const { notifikasi, setNotifikasi, getNotifById, handleCreate } = useNotifikasiContext();
  const [selectedNotif, setSelectedNotif] = useState(null);
  const unreadCount = notifikasi.filter((item) => !item.status).length;
  const { user, isLoaded, isSignedIn } = useUser();
  const { userLogin, loading, error } = useAuthUser();

  if (!isLoaded) {
    return (
        <>
        <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            
          </button>
        </>
    )
  }

  if (!isSignedIn) {
    return (
        <>
        <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            
          </button>
        </>
    )
  }

  return (
    <>
        {/* Notifications */}
        {/* {handleCreate({
            userId: user.id,
            judul: "Notifikasi baru",
            pesan: "Pesan notifikasi",
            tipe: "in_app",
            status: "terkirim"
            })} */}
        {/* {getNotifById(user.id)} */}
        {console.log(loading)}
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
                    onClick={() => {
                      setNotifikasi((prev) =>
                        prev.map((notif) =>
                          notif.id === item.id ? { ...notif, status: true } : notif
                        )
                      )
                      setSelectedNotif(item)
                      }
                    }
                    className={`p-3 rounded-md border-l-4 transition cursor-pointer
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
                    <p className="text-gray-700 truncate w-48">
                      {item.pesan}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedNotif && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-180">
                <h2 className="text-lg font-semibold">{selectedNotif.judul}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(selectedNotif.createdAt).toLocaleString()}
                </p>
                <p className="mt-3 text-gray-700">{selectedNotif.pesan}</p>
                <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setNotifikasi((prev) =>
                      prev.filter((n) => n.id !== selectedNotif.id)
                    );
                    setSelectedNotif(null);
                  }}
                  className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </>
    );
}