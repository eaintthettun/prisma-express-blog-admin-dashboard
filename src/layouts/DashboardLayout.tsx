import AppSidebar from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          {/* This is where the content of your child routes (e.g., HomePage) will be rendered. */}
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
