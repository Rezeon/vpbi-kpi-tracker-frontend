import React, { useContext } from "react";
import { NotifikasiContext } from "../store/createcontext/divisi.context";
import toast from "react-hot-toast";
import { useAuthUser } from "../utils/authUser";

export default function TaskReminder({ matriks }) {
  const { userLogin } = useAuthUser();
  const { handleCreate } = useContext(NotifikasiContext);

  const handleSendReminder = (userId) => {
    if (!userId) {
      toast.error("User ID tidak ditemukan ❌");
      return;
    }

    const basePayload = {
      userId: Number(userId),
      judul: "Reminder KPI",
      pesan: "Segera untuk mengerjakan matrik KPI yang diberikan",
    };

    handleCreate({ ...basePayload, tipe: "email" });
    handleCreate({ ...basePayload, tipe: "in_app" });
    toast.success("Reminder Send");
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-4 custom-scrollbar pb-2">
        {matriks.map((task) => (
          <div
            key={task.id}
            className="flex-shrink-0 w-[100%] sm:w-[100%] md:w-64 lg:w-64 bg-white shadow rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{task.namaKPI}</h3>
              <span className="text-xs px-2 py-1 rounded bg-amber-400 font-semibold text-white">
                {task.karyawan.nama}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Weight: {task.bobot}%</p>
            <p className="text-gray-500 text-sm">
              Due:{" "}
              {new Date(
                new Date(task.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="flex gap-1">{task.deskripsi}</div>
            {/* Reminder button */}
            {["leader", "admin"].includes(userLogin?.role) && (
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                onClick={() => handleSendReminder(task.karyawan.userId)}
              >
                Send Reminder
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
