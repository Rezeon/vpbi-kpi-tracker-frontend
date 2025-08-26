import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import { Karyawan } from "./pages/Karyawan";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/karyawan" element={<Karyawan />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
