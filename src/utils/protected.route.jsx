import { Outlet } from "react-router-dom";
import UnauthorizedPage from "../components/unauthorized";

export function RoleAdminPage({ userLogin }) {

  if (userLogin?.role !== "admin") {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}
