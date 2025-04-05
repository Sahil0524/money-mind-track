
import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { Home, LineChart, FilePlus, Settings, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function ExpenseLayout() {
  return (
    <ExpenseProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="border-r">
            <SidebarHeader className="px-6 py-5">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1">
                  <LineChart className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">Money Mind Track</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/expenses">
                      <LineChart className="h-5 w-5" />
                      <span>Expenses</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/add">
                      <FilePlus className="h-5 w-5" />
                      <span>Add Expense</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#settings">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#logout">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          
          <div className="flex-1 overflow-auto">
            <div className="flex items-center justify-between border-b p-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Money Mind Track</h1>
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
            <div className="container py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ExpenseProvider>
  );
}
