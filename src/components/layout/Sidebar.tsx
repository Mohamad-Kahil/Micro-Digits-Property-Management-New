import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Building2,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  className,
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Building2, label: "Properties", href: "/properties" },
    { icon: Users, label: "Tenants", href: "/tenants" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-[#1e293b] text-white transition-all duration-300",
        collapsed ? "w-20" : "w-[280px]",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-[#334155]">
        {!collapsed && (
          <div className="flex flex-col items-start">
            <span className="text-silver-400 font-bold text-xl">
              Micro Digits
            </span>
            <span className="text-amber-300 text-xs">Property Management</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-silver-400 font-bold text-lg">MD</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={onToggleCollapse}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed ? "" : "rotate-180",
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.label}>
              {collapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-center py-6 text-gray-300 hover:text-white hover:bg-[#334155]"
                        asChild
                      >
                        <Link to={item.href}>
                          <item.icon className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start py-6 text-gray-300 hover:text-white hover:bg-[#334155]"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-[#334155] p-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-[#334155]"
                  >
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Help & Support</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-300 hover:text-white hover:bg-[#334155]"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#334155]"
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              Help & Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#334155]"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
