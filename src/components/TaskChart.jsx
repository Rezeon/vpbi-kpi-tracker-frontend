import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weekData = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 5 },
  { day: "Wed", completed: 8 },
  { day: "Thu", completed: 6 },
  { day: "Fri", completed: 10 },
  { day: "Sat", completed: 7 },
  { day: "Sun", completed: 12 },
];

const monthData = [
  { week: "Week 1", completed: 15 },
  { week: "Week 2", completed: 20 },
  { week: "Week 3", completed: 25 },
  { week: "Week 4", completed: 18 },
];

export default function TaskChart() {
  const [view, setView] = useState("week"); // week or month

  const data = view === "week" ? weekData : monthData;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks Completed</h2>
        <div className="flex gap-2">
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
