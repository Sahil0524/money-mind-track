
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
import { SettingsProvider } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";
import { Home, LineChart, FilePlus, Settings, LogOut, User, UserPlus } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AuthenticatedContent = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };
  
  return (
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
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between border-b p-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Money Mind Track</h1>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="container py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

const UnauthenticatedContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1">
            <LineChart className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">Money Mind Track</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/signin")}>
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" onClick={() => navigate("/signup")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Sign Up
          </Button>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export function ExpenseLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? <AuthenticatedContent /> : <UnauthenticatedContent />}
    </>
  );
}

// We need a wrapper that provides context to ExpenseLayout
export function ExpenseLayoutWrapper() {
  return (
    <SettingsProvider>
      <ExpenseProvider>
        <ExpenseLayout />
      </ExpenseProvider>
    </SettingsProvider>
  );
}
