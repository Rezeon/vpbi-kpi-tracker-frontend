import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../components/loading/loading";

export function ProtectedRoute() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingPage />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
