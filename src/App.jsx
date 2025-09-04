import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import { SignedInUser } from "./components/sign-in";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/sign-in" element={<SignedInUser />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
