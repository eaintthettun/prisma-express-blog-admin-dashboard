import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  FileText,
  Inbox,
  LucideLayoutDashboard,
  NotepadTextIcon,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getRandomColor } from "@/lib/utils";
import { NavAdmin } from "./nav-admin";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    badge: 5,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: FileText,
    badge: 39,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
    badge: 20,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    badge: 15,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const adminProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/avatars/01.png", // Replace with a real avatar URL
  initials: "JD",
};

export default function AppSidebar() {
  return (
    <Sidebar variant="inset" className="p-0">
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/">
          <div className="flex items-center gap-3">
            {/* Logo and Website Name */}
            <NotepadTextIcon className="h-8 w-8 text-cyan-800" />
            <span className="text-2xl font-mono shadow-2xl font-extrabold text-slate-800">
              MYBLOG
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 flex-grow overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-gray-500 mb-2">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="p-2 flex items-center"
                >
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                  {/* Badge with random color and circular shape */}
                  {item.badge && (
                    <div
                      className={`text-xs p-2 h-5 w-5 flex items-center justify-center rounded-full ${getRandomColor()}`}
                    >
                      {item.badge}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-2 py-3 bg-gray-200">
        <NavAdmin user={adminProfile} />
      </SidebarFooter>
    </Sidebar>
  );
}
