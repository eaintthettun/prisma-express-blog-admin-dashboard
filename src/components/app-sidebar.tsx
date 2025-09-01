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
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavAdmin } from "./nav-admin";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/home",
    icon: LucideLayoutDashboard,
  },
  {
    title: "Authors",
    url: "/authors",
    icon: Users,
  },
  {
    title: "Posts",
    url: "/posts",
    icon: FileText,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    badge: 10,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const adminItems = [
  {
    title: "Admins",
    url: "/admins",
    icon: Shield,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar variant="inset" className="border-r border-slate-200 bg-white ">
      <SidebarHeader className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-6 py-4">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors group-hover:bg-slate-800">
              <NotepadTextIcon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900 tracking-tight">
                MYBLOG
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Content Management
              </span>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup className="mb-8">
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Content Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-white transition-all duration-200 font-medium"
                    >
                      <item.icon className="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
                      <span>{item.title}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group">
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-white transition-all duration-200 font-medium"
                    >
                      <item.icon className="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 bg-white/80 backdrop-blur-sm p-4">
        <NavAdmin />
      </SidebarFooter>
    </Sidebar>
  );
}
