import React from "react";

const tasks = [
  {
    name: "Prepare KPI report",
    due: "2025-08-21",
    status: "urgent",
    assigned: ["Alice", "Bob"],
  },
  {
    name: "Update website",
    due: "2025-08-25",
    status: "upcoming",
    assigned: ["Charlie"],
  },
  {
    name: "Team meeting notes",
    due: "2025-08-20",
    status: "overdue",
    assigned: ["Alice", "David"],
  },
];

const statusColors = {
  urgent: "bg-red-500 text-white",
  upcoming: "bg-yellow-400 text-gray-800",
  overdue: "bg-gray-300 text-gray-700",
};

export default function TaskReminder() {
  const handleSendReminder = (task) => {
    // Placeholder function
    alert(`Reminder sent for task: ${task.name}`);
    // Later: call your API to send email
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Task Reminders</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-64 bg-white shadow rounded-lg p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{task.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  statusColors[task.status]
                }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm">Due: {task.due}</p>
            <div className="flex gap-1">
              {task.assigned.map((user, i) => (
                <div
                  key={i}
                  className="w-auto pt-1 pb-1 pr-2 pl-2 bg-blue-500 rounded-full font-semibold text-white text-xs flex items-center justify-center border border-white"
                >
                  {user}
                </div>
              ))}
            </div>
            {/* Reminder button */}
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              onClick={() => handleSendReminder(task)}
            >
              Send Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
