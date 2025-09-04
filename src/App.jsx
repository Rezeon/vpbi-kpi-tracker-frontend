import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import { Setting } from "./pages/Settings";
import { SignIn } from "@clerk/clerk-react";

export default function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route
            path="/sign-in"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Setting />} /> */}
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
