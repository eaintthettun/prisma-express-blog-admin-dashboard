import { useAdminContext } from "@/context/AdminContext";
import { Navigate, Outlet } from "react-router-dom";

// This component acts as a gatekeeper for protected routes.
export const PrivateRoute = () => {
  // We use the context hook to get the authentication status.
  const { authenticatedAdmin } = useAdminContext();

  console.log("authenticated admin in private route:", authenticatedAdmin);
  // If the admin is authenticated, render the child routes (e.g., HomePage).
  if (authenticatedAdmin) {
    return <Outlet />;
  }

  // If the admin is not authenticated, redirect them to the login page.
  return <Navigate to="/" />;
};
