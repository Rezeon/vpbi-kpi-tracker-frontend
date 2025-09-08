import { Outlet } from "react-router-dom";
import UnauthorizedPage from "../components/unauthorized";

export function RoleAdminLeaderPage({ userLogin }) {

  if (userLogin?.role !== "admin" && userLogin?.role !== "leader") {
    return <UnauthorizedPage />;
  }

  return <Outlet />;
}
