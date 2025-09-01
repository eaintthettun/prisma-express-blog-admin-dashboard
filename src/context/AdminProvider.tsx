import { Admin } from "@/types/type";
import React, { useState, ReactNode, useEffect } from "react";
import { AdminContext } from "./AdminContext";

interface AdminProviderProps {
  children: ReactNode;
}

// Create the provider that will hold and manage the state.
export const AdminProvider = ({ children }: AdminProviderProps) => {
  //console.log("hello admin provider");
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState<Admin | null>(
    null
  );

  console.log("authenticated admin in admin provider:", authenticatedAdmin);

  // Use useEffect to load data from localStorage on initial render.
  // This ensures the user's state is preserved after a page refresh.
  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("authenticatedAdmin");
      if (storedAdmin) {
        setAuthenticatedAdmin(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error("Failed to parse admin data from localStorage:", error);
      // Optional: Clear corrupted data from localStorage to prevent repeated errors.
      localStorage.removeItem("authenticatedAdmin");
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts.

  const value = {
    authenticatedAdmin,
    setAuthenticatedAdmin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
