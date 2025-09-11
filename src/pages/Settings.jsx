import { useContext } from "react";
import LoadingPage from "../components/loading/loading";
import { useAuthUser } from "../utils/authUser";
import { DivisiContext, MatriksContext } from "../store/createcontext/divisi.context";
import { SettingPenilaian } from "../components/setting/setting.penilaian";
import EmployeeTasksForm from "../components/EmployeeTasksForm";

export function Setting() {
  const { userLogin, loading } = useAuthUser();
  const { matriks: matrikKaryawan, handleUpdate, handleDelete, handleCreate } = useContext(MatriksContext);
  const {divisi} = useContext(DivisiContext)
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col gap-3">
      {userLogin && (
        <>
          {userLogin?.role === "leader" && (
            <EmployeeTasksForm userLogin={userLogin} />
          )}
        </>
      )}
      {userLogin && (
        <>
          {userLogin?.role === "admin" && (
            <EmployeeTasksForm handleCreate={handleCreate} divisi={divisi} userLogin={userLogin} />
          )}
        </>
      )}
      {userLogin?.role === "leader" && (
        <SettingPenilaian divisi={divisi}  matriks={matrikKaryawan} handleDelete={handleDelete} handleUpdate={handleUpdate} userLogin={userLogin} />
      )}
      {userLogin?.role === "user" && (
        <SettingPenilaian divisi={divisi}  matriks={matrikKaryawan} handleDelete={handleDelete} handleUpdate={handleUpdate} userLogin={userLogin} />
      )}
      {userLogin?.role === "admin" && (
        <SettingPenilaian divisi={divisi}  matriks={matrikKaryawan} handleDelete={handleDelete} handleUpdate={handleUpdate} userLogin={userLogin} />
      )}
    </div>
  );
}
