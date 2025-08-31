import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import { Karyawan } from "./pages/Karyawan";
import { AddKaryawan } from "./pages/AddKaryawan";
import { EditKaryawan } from "./pages/editKaryawan";
import { Divisi } from "./pages/divisi";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/divisi" element={<Divisi />} />
          <Route path="/karyawan/add" element={<AddKaryawan />} />
          <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
