import { useContext, useState } from "react";
import FormBuktiKPI from "../../components/task/buktitask/buktiTask";
import SendEmail from "../../components/task/sendEmail/sendEmail";
import TaskComponent from "../../components/task/taskComponent";
import { useAuthUser } from "../../utils/authUser";
import ViewBuktiKPI from "../../components/task/buktitask/viewbuktikpi";
import LoadingPage from "../../components/loading/loading";
import UnauthorizedPage from "../../components/unauthorized";
import { DivisiContext, MatriksContext } from "../../store/createcontext/divisi.context";

export default function Task() {
  const { userLogin, loading } = useAuthUser();
  const {divisi} = useContext(DivisiContext)
  const {matriks} = useContext(MatriksContext)
  const [selectedMatriksId, setSelectedMatriksId] = useState(null);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  if (!userLogin)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <UnauthorizedPage />
      </div>
    );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      {/* Kiri → Task board */}
      <div className="flex-1">
        <TaskComponent divisi={divisi} userLogin={userLogin} onSelectMatriks={(id) => setSelectedMatriksId(id)} matriks={matriks} />
      </div>

      {/* Kanan → Sidebar */}
      <div className="w-full md:w-[300px] shrink-0 relative">
        <div className="sticky top-28 space-y-4 flex flex-col">
          {(userLogin.role === "admin" || userLogin.role === "leader") &&
            selectedMatriksId && (
              <ViewBuktiKPI
                matriksId={selectedMatriksId}
                onClose={() => setSelectedMatriksId(null)}
              />
            )}
          {(userLogin.role === "leader" || userLogin.role === "admin") && (
            <SendEmail />
          )}
          {/* User kirim bukti */}
          {userLogin.role === "user" && selectedMatriksId && (
            <FormBuktiKPI
              matriksId={selectedMatriksId}
              onClose={() => setSelectedMatriksId(null)}
              userLogin={userLogin}
            />
          )}
        </div>
      </div>
    </div>
  );
}
