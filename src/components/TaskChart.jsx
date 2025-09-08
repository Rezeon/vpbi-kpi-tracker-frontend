import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useAuthUser } from "../utils/authUser";
import { MatriksContext } from "../store/createcontext/divisi.context";

export default function TaskChart() {
  const [view, setView] = useState("week");
  const { userLogin } = useAuthUser();
  const date = new Date();
  const monthName = date.toLocaleString("id-ID", { month: "long" });
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const { matriks: matrikKaryawan } = useContext(MatriksContext);
  const [selectedMonth, setSelectedMonth] = useState(monthName);

  const monthOptions = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const matriksU =
    userLogin?.divisiLeader?.karyawan?.flatMap((k) => k.matriks) || [];

  const matrik =
    userLogin?.role === "admin"
      ? matrikKaryawan
      : matrikKaryawan.filter((m) => matriksU.some((mu) => mu.id === m.id));

  // kategorisasi task
  const newTasks = matrik.filter((task) => {
    const taskDate = new Date(task.createdAt);
    return (
      task.tahun === selectedYear &&
      task.bulan === selectedMonth &&
      (Date.now() - taskDate.getTime()) / (1000 * 60 * 60 * 24) <= 7 // <= 7 hari
    );
  });

  const onProgressTasks = matrik.filter(
    (m) =>
      m.tahun === selectedYear &&
      m.bulan === selectedMonth &&
      (!m.detail || m.detail.length === 0)
  );
  console.log("j", onProgressTasks)
  console.log("ja", newTasks)

  const doneTasks = matrik.filter(
    (m) =>
      m.tahun === selectedYear &&
      m.bulan === selectedMonth &&
      m.detail &&
      m.detail.length > 0
  );

  function getWeekData() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const counts = {};

    days.forEach((d) => {
      counts[d] = { new: 0, progress: 0, completed: 0 };
    });

    newTasks.forEach((m) => {
      const d = new Date(m.createdAt);
      const day = days[d.getDay()];
      counts[day].new += 1;
    });

    onProgressTasks.forEach((m) => {
      const d = new Date(m.createdAt);
      const day = days[d.getDay()];
      counts[day].progress += 1;
    });

    doneTasks.forEach((m) => {
      const d = new Date(m.createdAt);
      const day = days[d.getDay()];
      counts[day].completed += 1;
    });

    return days.map((day) => ({
      day,
      new: counts[day].new,
      progress: counts[day].progress,
      completed: counts[day].completed,
    }));
  }

  function getMonthData() {
    const counts = {
      "Week 1": { new: 0, progress: 0, completed: 0 },
      "Week 2": { new: 0, progress: 0, completed: 0 },
      "Week 3": { new: 0, progress: 0, completed: 0 },
      "Week 4": { new: 0, progress: 0, completed: 0 },
    };

    const process = (arr, key) => {
      arr.forEach((m) => {
        const d = new Date(m.createdAt);
        const weekNum = Math.ceil(d.getDate() / 7);
        counts[`Week ${weekNum}`][key] += 1;
      });
    };

    process(newTasks, "new");
    process(onProgressTasks, "progress");
    process(doneTasks, "completed");

    return Object.keys(counts).map((week) => ({
      week,
      new: counts[week].new,
      progress: counts[week].progress,
      completed: counts[week].completed,
    }));
  }

  const data = view === "week" ? getWeekData() : getMonthData();

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks Overview</h2>

        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-3 text-sm sm:text-sm md:text-lg lg:text-lg  items-start mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border px-2 py-1 rounded w-20"
          />
        </div>

        <div className="flex gap-2 flex-col sm:flex-col md:flex-row lg:flex-row text-sm sm:text-sm md:text-lg lg:text-lg   ">
          <button
            className={`px-3 py-1 rounded ${
              view === "week" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded ${
              view === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={view === "week" ? "day" : "week"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="new"
            stroke="#f59e0b"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="#10b981"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
