import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import { Karyawan } from "./pages/Karyawan";
import { AddKaryawan } from "./pages/AddKaryawan";
import { EditKaryawan } from "./pages/editKaryawan";
import { Divisi } from "./pages/divisi";
import { SignedInUser } from "./components/sign-in";
import { SettingEditAdd } from "./pages/setting.divisi";
import { ProtectedRoute } from "./utils/auth.middleware";
import { SelectRole } from "./pages/seting.role";
import { useAuthUser } from "./utils/authUser";
import { RoleAdminPage } from "./utils/protected.route";
import { RoleAdminLeaderPage } from "./utils/protected.leader";
import Task from "./pages/Task/Task";

export default function App() {
  const {userLogin} = useAuthUser()
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/sign-in" element={<SignedInUser />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/divisi" element={<Divisi />} />
            <Route path="/karyawan" element={<Karyawan />} />
            <Route path="/task" element={<Task />} />
            <Route element={<RoleAdminLeaderPage userLogin={userLogin} />}>
              <Route path="/settings" element={<Setting />} />
            </Route>
            <Route element={<RoleAdminPage userLogin={userLogin} />}>
              <Route path="/karyawan/add" element={<AddKaryawan />} />
              <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />
              <Route path="/divisi/edit/:id" element={<SettingEditAdd />} />
              <Route path="/divisi/add" element={<SettingEditAdd />} />
            </Route>
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
