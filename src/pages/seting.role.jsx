import { SetingRole } from "../components/setting/setting.role";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../utils/authUser";

export function SelectRole() {
  const { userLogin } = useAuthUser();
  return (
    <div className="w-full h-screen">
      {userLogin?.role ? <SetingRole /> : <Navigate to="/select-role" replace /> }
    </div>
  );
}
