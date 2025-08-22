import DashboardLayout from "../layouts/DashboardLayout";
import EmployeeTasksForm from "../components/EmployeeTasksForm";
import TaskChart from "../components/TaskChart";
import TaskReminder from "../components/TaskReminder";

export default function Dashboard() {
  return (
    <DashboardLayout rightContent={<EmployeeTasksForm />}>
      {/* Dashboard middle content */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* New Tasks */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              {/* Icon */}
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">New Tasks</h2>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>{" "}
            {/* Progress */}
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Tasks added in the last 24 hours
          </p>
        </div>

        {/* In Progress */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h16v16H4z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">In Progress</h2>
          </div>
          <p className="text-2xl font-bold mt-2">8</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Tasks currently being worked on
          </p>
        </div>

        {/* Done Tasks */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">Done Tasks</h2>
          </div>
          <p className="text-2xl font-bold mt-2">25</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Tasks completed in the last 7 days
          </p>
        </div>
      </section>
      <TaskChart />
      <TaskReminder />
    </DashboardLayout>
  );
}
