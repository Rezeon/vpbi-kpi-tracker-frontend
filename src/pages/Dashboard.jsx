import EmployeeTasksForm from "../components/EmployeeTasksForm";
import TaskChart from "../components/TaskChart";
import TaskReminder from "../components/TaskReminder";
import done from "../assets/done.png";
import inpro from "../assets/inpro.png";
import pro from "../assets/task.png";
import { useAuth } from "@clerk/clerk-react";
import { useAuthUser } from "../utils/authUser";
import LoadingPage from "../components/loading/loading";
const task = {
  tasks: {
    allTask: 35,
  },
  Task: [
    {
      title: "Done Task",
      task: 20,
      image: done,
    },
    {
      title: "In Progres",
      task: 8,
      image: inpro,
    },
    {
      title: "New task",
      task: 7,
      image: pro,
    },
  ],
};

export default function Dashboard() {
  const { userLogin, loading } = useAuthUser();
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }
  return (
    <div className="flex w-full h-auto gap-6 font-sans ">
      <div className="w-10/12 h-screen flex-1">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {task.Task.map((tak, idx) => (
            <div
              key={idx}
              className=" h-44 p-2  bg-white shadow rounded-xl flex flex-col gap-3 items-start"
            >
              <div className="w-full h-1/2 flex items-center  gap-2 p-2 relative">
                <div className="w-[12%] aspect-square bg-gray-100 rounded-full p-2">
                  <img src={tak.image} alt="" className="w-full" />
                </div>
                <p className="text-lg text-gray-400 font-medium">{tak.title}</p>
                <p className="text-2xl text-black font-bold absolute right-6">
                  {tak.task}
                </p>
              </div>
              <hr className="my-2 border border-gray-600" />
              <div className="w-full p-2 flex flex-col h-auto gap-3">
                <p className="font-semibold text-gray-700">
                  {" "}
                  from {task.tasks.allTask} {tak.title} {tak.task}
                </p>
                <div className="w-full relative h-[10px]">
                  <div className="h-full w-full rounded-2xl bg-gray-200 absolute "></div>
                  <div
                    className="h-full z-1 rounded-2xl bg-blue-400 absolute "
                    style={{
                      width: `${(tak.task / task.tasks.allTask) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <TaskChart />
        <TaskReminder />
      </div>
      <EmployeeTasksForm userLogin={userLogin} />
      
    </div>
  );
}
