// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAdminContext } from "@/context/AdminContext";
import React from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAdminContext();

  if (!token) {
    // Not logged in → go to login page
    return <Navigate to="/" replace />;
  }

  return children;
}
