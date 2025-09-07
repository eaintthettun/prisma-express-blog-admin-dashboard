import { Admin } from "@/types/type";
import React, { useState, ReactNode, useEffect } from "react";
import { AdminContext } from "./AdminContext";
import { jwtDecode } from "jwt-decode";
interface AdminProviderProps {
  children: ReactNode;
}

// Create the provider that will hold and manage the state.
export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<Admin | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //to protect null value on page refresh,reassign token again
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setLoading(false);
      try {
        const decoded: Admin = jwtDecode(token);
        setAuthenticatedAdmin(decoded);
      } catch {
        setAuthenticatedAdmin(null);
      }
    }
    setLoading(false);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthenticatedAdmin(null);
  };

  const value = {
    authenticatedAdmin,
    setAuthenticatedAdmin,
    token,
    setToken,
    logout,
    loading,
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
