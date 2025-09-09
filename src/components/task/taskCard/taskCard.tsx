import React from "react";
import { useAuthUser } from "../../../utils/authUser";

// ---------- Types ----------
type Task = {
    id: number;
    namaKPI: string;
    deskripsi: string;
    bulan: string;
    tahun: number;
    bobot: number;
    karyawanId: number;
    createdAt: string;
    detail?: { id: number; nilai: number }[];
    karyawan?: {
        id: number;
        nama: string;
        divisiId: number;
    };
};

interface TaskCardProps {
    task: Task;
    onSelect?: (id: number) => void;     // untuk user
    onViewBukti?: (id: number) => void;  // untuk admin/leader
    role: "admin" | "leader" | "user";
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect, onViewBukti, role }) => {
    const hasDetail = task.detail && task.detail.length > 0;

    // ✅ Ambil role dari auth
    const { userLogin } = useAuthUser() as {
        userLogin: { role: "admin" | "leader" | "user" } | null;
    };

    const isAdminOrLeader =
        userLogin?.role === "admin" || userLogin?.role === "leader";

    return (
        <div className="flex flex-col shadow-md rounded-2xl p-4 w-full h-fit border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03] break-inside-avoid mb-4">
            {/* Label (Nama karyawan) */}
            <span
                className={`px-3 py-1 text-sm font-semibold rounded-lg w-fit ${hasDetail ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                    }`}
            >
                {task?.karyawan?.nama}
            </span>

            {/* Bulan & Tahun */}
            <span className="font-semibold text-md dark:text-white mt-2">
                {task.bulan} {task.tahun}
            </span>

            {/* Title */}
            <h3 className="font-semibold text-md dark:text-white mt-2">
                {task.namaKPI}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm">{task.deskripsi}</p>

            {/* Detail Nilai (jika ada) */}
            {hasDetail && (
                <div className="mt-2">
                    <p className="text-sm text-green-600 font-medium">Nilai:</p>
                    <ul className="list-disc list-inside text-sm text-green-700">
                        {task.detail?.map((d) => (
                            <li key={d.id}>Nilai: {d.nilai}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Footer */}
            <div className="flex-col items-center justify-between mt-3 text-sm text-gray-400">
                <p>Bobot: {task.bobot}</p>
                <p>Dibuat: {new Date(task.createdAt).toLocaleDateString("id-ID")}</p>
            </div>

            {/* Tombol sesuai role */}
            {isAdminOrLeader ? (
                onViewBukti && (
                    <button
                        onClick={() => onViewBukti(task.id)}
                        className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                        Lihat Bukti
                    </button>
                )
            ) : (
                onSelect && (
                    <button
                        onClick={() => onSelect(task.id)}
                        className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
                    >
                        {role === "user" ? "Upload Bukti" : "Lihat Bukti KPI"}
                    </button>
                )
            )}
        </div>
    );
};

export default TaskCard;
