import { useContext } from "react";
import LoadingPage from "../components/loading/loading";
import { SettingDivisi } from "../components/setting/setting.divisi";
import { SetingRole } from "../components/setting/setting.role";
import { useAuthUser } from "../utils/authUser";
import { MatriksContext } from "../store/createcontext/divisi.context";
import { SettingPenilaian } from "../components/setting/setting.penilaian";
import EmployeeTasksForm from "../components/EmployeeTasksForm";

export function Setting() {
  const { userLogin, loading } = useAuthUser();
  const { matriks: matrikKaryawan } = useContext(MatriksContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }
  const matrik =
    userLogin.role === "admin"
      ? matrikKaryawan
      : userLogin.divisiLeader?.karyawan?.flatMap((k) => k.matriks) ?? [];
  return (
    <div className="w-full h-screen flex flex-col gap-3">
      {userLogin && (
        <>
          {userLogin?.role === "leader" && (
            <EmployeeTasksForm userLogin={userLogin} />
          )}
        </>
      )}
      {!userLogin?.role && <SetingRole />}
      {userLogin?.role === "admin" && <SettingDivisi />}
      {userLogin?.role === "leader" && <SettingPenilaian matrik={matrik} userLogin={userLogin} />}
    </div>
  );
}
