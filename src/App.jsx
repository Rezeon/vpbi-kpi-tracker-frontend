import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import Task from "./pages/Task/Task";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Setting /> } />
          <Route path="/task" element={<Task /> } />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
