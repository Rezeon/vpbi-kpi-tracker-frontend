import EmployeeTasksForm from "../components/EmployeeTasksForm";
import TaskChart from "../components/TaskChart";
import TaskReminder from "../components/TaskReminder";
import { useAuthUser } from "../utils/authUser";
import LoadingPage from "../components/loading/loading";
import { ClipboardCheck, NotebookPen, ClipboardPlus } from "lucide-react";
import { useContext } from "react";
import {
  DivisiContext,
  MatriksContext,
} from "../store/createcontext/divisi.context";

export default function Dashboard() {
  const { userLogin, loading } = useAuthUser();
  const { matriks: matrikKaryawan } = useContext(MatriksContext);
  const { divisi } = useContext(DivisiContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }

  if (!userLogin) return null;

  const matrik =
    userLogin?.role === "admin"
      ? matrikKaryawan
      : divisi
          .find((d) => d.id === userLogin?.karyawan?.divisiId)
          ?.karyawan?.flatMap((k) => k.matriks) ?? [];

  const now = new Date();
  const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));

  const newTasks = matrik.filter(
    (task) => new Date(task.createdAt) >= oneWeekAgo
  );

  const doneTasks = matrik.filter((m) => m.detail && m.detail.length > 0);
  const onProgressTasks = matrik.filter(
    (m) => !m.detail || m.detail.length === 0
  );
  const task = {
    tasks: {
      allTask: matrik.length,
    },
    Task: [
      {
        title: "Done Task",
        task: doneTasks.length,
        image: (
          <div className="w-[12%] aspect-square bg-blue-400 rounded-full flex items-center justify-center ">
            <ClipboardCheck color="white" size={20} />
          </div>
        ),
      },
      {
        title: "In Progres",
        task: onProgressTasks.length,
        image: (
          <div className="w-[12%] aspect-square bg-green-400 rounded-full flex items-center justify-center ">
            <NotebookPen color="white" size={20} />
          </div>
        ),
      },
      {
        title: "New task",
        task: newTasks.length,
        image: (
          <div className="w-[12%] aspect-square bg-yellow-400 rounded-full flex items-center justify-center ">
            <ClipboardPlus color="white" size={20} />
          </div>
        ),
      },
    ],
  };
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
                {tak.image}
                <p className="text-lg text-gray-400 font-medium">{tak.title}</p>
                <p className="text-2xl text-black font-bold absolute right-6">
                  {tak.task}
                </p>
              </div>
              <hr className="my-2 w-full border h-2 rounded-2xl border-gray-400" />
              <div className="w-full p-2 flex flex-col h-auto gap-3 pb-2">
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
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
        <TaskChart matrikKaryawan={matrikKaryawan} userLogin={userLogin} />
        <TaskReminder userLogin={userLogin} matriks={matrik} />
      </div>
    </div>
  );
}
