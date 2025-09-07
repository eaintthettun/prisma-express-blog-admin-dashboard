// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAdminContext } from "@/context/AdminContext";
import React from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAdminContext();

  if (loading) return <div>Loading...</div>;
  if (!token) {
    // Not logged in → go to login page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
