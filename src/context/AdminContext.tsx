import { Admin } from "@/types/type";
import { useContext, createContext } from "react";

// Define the shape of your context data, including the possibility of a null state.
interface AdminContextType {
  authenticatedAdmin: Admin | null;
  setAuthenticatedAdmin: (admin: Admin | null) => void;
}

// Step 1: Create  AdminContext container with a default value of `null`.
export const AdminContext = createContext<AdminContextType | null>(null);

// Step 3: Create a custom hook to consume the context and export it.
export const useAdminContext = () => {
  //console.log("hello use admin context");
  const context = useContext(AdminContext); //subscribe AdminContext
  if (context === null) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};
//const {authenticatedAdmin,setAuthenticatedAdmin}=useAdminContext(); //any page can use this
