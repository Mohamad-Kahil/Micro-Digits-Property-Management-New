import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const DashboardLayout = ({ children, className }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the theme in the document
    // or use a theme context provider
  };

  return (
    <div className={cn("flex h-screen w-full bg-background", className)}>
      <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={toggleTheme}
          userName="Thomas Fleming"
          userEmail="tf@gmail.com"
          notificationCount={3}
        />

        <main
          className={cn(
            "flex-1 overflow-auto p-6",
            sidebarCollapsed ? "ml-20" : "ml-0",
          )}
        >
          <div className="container mx-auto">
            {children || (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Select a dashboard component to view
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
