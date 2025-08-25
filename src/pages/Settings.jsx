import { SetingKaryawan } from "../components/setting/setting.karyawan";
import { useAuthUser } from "../utils/authUser";

export function Setting() {
    const { userLogin, user } = useAuthUser();
    user
    console.log("ubah", userLogin)
    return (
        <>
            {userLogin?.role === "admin" && <SetingKaryawan />}
        </>
    );
}
