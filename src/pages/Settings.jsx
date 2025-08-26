import { SettingDivisi } from "../components/setting/setting.divisi";
import { SetingRole } from "../components/setting/setting.role";
import { useAuthUser } from "../utils/authUser";

export function Setting() {
  const { userLogin } = useAuthUser();

  return (
    <div className="w-full h-screen flex flex-col gap-3">
      {!userLogin?.role && <SetingRole />}
      <SettingDivisi />
    </div>
  );
}
