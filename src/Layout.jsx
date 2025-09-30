import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@utils/createPageUrl.js";
import {
  Activity,
  BarChart3,
  Settings,
  AlertTriangle,
  Wrench,
  FileText,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar.jsx";

// روابط القائمة
const navigationItems = [
  { title: "Live Monitoring", url: createPageUrl("Dashboard"), icon: Activity },
  { title: "Analytics",       url: createPageUrl("Analytics"), icon: BarChart3 },
  { title: "Alerts",          url: createPageUrl("Alerts"),    icon: AlertTriangle },
  { title: "Maintenance",     url: createPageUrl("Maintenance"), icon: Wrench },
  { title: "Reports",         url: createPageUrl("Reports"),   icon: FileText },
];

export default function Layout({ children /*, currentPageName*/ }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-screen bg-slate-950 text-slate-100 overflow-x-hidden">
        {/* ===== Sidebar ===== */}
        <Sidebar className="border-r border-slate-800 bg-slate-900">
          <SidebarHeader className="border-b border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg">ElectroGuard</h2>
                <p className="text-xs text-slate-400">Predictive AI System</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                   const active =
  location.pathname === item.url ||
  (item.url === '/dashboard' && location.pathname === '/');

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`hover:bg-slate-800 hover:text-cyan-400 transition-colors duration-200 rounded-lg mb-1 ${
                            active ? "bg-slate-800 text-cyan-400" : "text-slate-300"
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Status (اختياري) */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-2">
                System Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Units Online</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-500 font-bold">4/4</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Active Alerts</span>
                    <span className="text-yellow-500 font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Avg Readiness</span>
                    <span className="text-cyan-400 font-bold">87%</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-slate-300 font-medium text-sm">O</span>
              </div>
             <div className="flex-1 min-w-0 overflow-auto p-0">
                <p className="font-medium text-white text-sm truncate">Operations Team</p>
                <p className="text-xs text-slate-400 truncate">Green Hydrogen Facility</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* ===== Main ===== */}
        <main className="flex-1 min-w-0 flex flex-col bg-slate-950">
          {/* Mobile Header */}
          <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-800 p-2 rounded-lg transition-colors duration-200 text-slate-300" />
              <h1 className="text-xl font-bold text-white">ElectroGuard AI</h1>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}


