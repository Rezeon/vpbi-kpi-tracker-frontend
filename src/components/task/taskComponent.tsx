import React, { useState, useContext, useEffect } from "react";
import Button from "../ui/button/Button";
import TaskCard from "./taskCard/taskCard";
import Masonry from "react-masonry-css";
import { useAuthUser } from "../../utils/authUser";
import { DivisiContext, MatriksContext } from "../../store/createcontext/divisi.context";

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

type MatriksKPI = Task;

type Karyawan = {
    id: number;
    nama: string;
    divisiId: number;
    matriks: MatriksKPI[];
};

type Divisi = {
    id: number;
    nama: string;
    deskripsi: string;
    karyawan: Karyawan[];
};

type UserLogin = {
    id: number;
    role: "admin" | "leader" | "user";
    karyawan?: {
        id: number;
        divisiId: number;
    };
};

// ---------- Component ----------
export default function TaskComponent({ onSelectMatriks, userLogin, loading, divisi, matriks : matrikKaryawan }: { onSelectMatriks?: (id: number) => void; userLogin:UserLogin; loading:boolean; matriks:MatriksKPI[]; divisi:Divisi[] }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<"all" | "complete" | "new" | "progress">("all");

    const matrik =
        userLogin?.role === "admin"
            ? matrikKaryawan
            : divisi.find((d) => d.id === userLogin?.karyawan?.divisiId)
                ?.karyawan?.flatMap((k) => k.matriks) ?? [];

    useEffect(() => {
        setTasks(matrik);
    }, []);

    // ---------------- FILTER LOGIC ----------------
    const now = new Date();
    const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));

    const newTasks = matrik.filter((task) => new Date(task.createdAt) >= oneWeekAgo);
    const completeTasks = matrik.filter((m) => m.detail && m.detail.length > 0);
    const progressTasks = matrik.filter((m) => m.detail && m.detail.length === 0);

    const filteredTasks =
        filter === "complete"
            ? completeTasks
            : filter === "new"
                ? newTasks
                : filter === "progress"
                    ? progressTasks
                    : matrik; // default "all"

    // ---------------- UI ----------------
    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (!userLogin) return <p className="text-red-500">Unauthorized</p>;

    return (
        <>
            <h2 className="text-xl mb-4 dark:text-white">Task</h2>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <Button
                    variant={filter === "complete" ? "primary" : "outline"}
                    size="md"
                    className="flex-1 sm:flex-none"
                    onClick={() => setFilter("complete")}
                >
                    Complete
                </Button>
                <Button
                    variant={filter === "new" ? "primary" : "outline"}
                    size="md"
                    className="flex-1 sm:flex-none"
                    onClick={() => setFilter("new")}
                >
                    New Task
                </Button>
                <Button
                    variant={filter === "progress" ? "primary" : "outline"}
                    size="md"
                    className="flex-1 sm:flex-none"
                    onClick={() => setFilter("progress")}
                >
                    In Progress
                </Button>
                <Button
                    variant={filter === "all" ? "primary" : "outline"}
                    size="md"
                    className="flex-1 sm:flex-none"
                    onClick={() => setFilter("all")}
                >
                    All
                </Button>
            </div>

            {/* Grid TaskCard */}
            <Masonry
                breakpointCols={{ default: 4, 1100: 3, 800: 2, 400: 1 }}
                className="flex gap-4"
                columnClassName="space-y-4"
            >
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onSelect={onSelectMatriks}         
                        onViewBukti={onSelectMatriks} userLogin={userLogin?.role} />
                ))}
            </Masonry>
        </>
    );
}
