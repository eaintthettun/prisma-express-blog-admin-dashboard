// src/layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <SidebarComponent />

      {/* Main content area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet /> {/* This renders the page content */}
      </div>
    </div>
  );
}
