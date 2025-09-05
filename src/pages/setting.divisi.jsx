import { useParams } from "react-router-dom";
import LoadingPage from "../components/loading/loading";
import { SettingDivisi } from "../components/setting/setting.divisi";
import { useAuthUser } from "../utils/authUser";

export function SettingEditAdd() {
  const { id } = useParams();
  const { userLogin, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col gap-3">
      {userLogin?.role === "admin" && <SettingDivisi idEdit={id} />}
    </div>
  );
}
