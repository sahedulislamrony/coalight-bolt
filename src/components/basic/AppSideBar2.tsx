"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Folder,
  Calendar,
  Settings,
  LifeBuoy,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Folder, label: "Projects" },
    { icon: Calendar, label: "Calendar" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings" },
    { icon: LifeBuoy, label: "Support" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar (left) */}
      <aside
        className={`hidden md:flex flex-col border-r dark:border-gray-800 transition-all duration-300 ${
          collapsed ? "w-16" : "w-52"
        }`}
      >
        {/* App Branding */}
        <div
          className={`p-4 border-b dark:border-gray-800 flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-primary" />
            {!collapsed && (
              <span className="ml-2 font-semibold text-lg">Coalight</span>
            )}
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "default"}
                  className={`w-full justify-start rounded-sm ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="p-2 border-t dark:border-gray-800 space-y-1">
          {bottomItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={collapsed ? "icon" : "default"}
                  className={`w-full justify-start rounded-sm ${
                    collapsed ? "justify-center" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Navigation */}
        <header className="md:hidden flex flex-col border-b dark:border-gray-800">
          {/* Top Bar with Brand and Menu Button */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="ml-2 font-semibold text-lg">Coalight</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Horizontal) */}
          {mobileMenuOpen && (
            <div className="px-2 pb-2 flex overflow-x-auto space-x-1">
              {[...navItems, ...bottomItems].map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  className="shrink-0 rounded-sm"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          )}
        </header>

        {/* Desktop Top Navigation */}
        <nav className="hidden md:flex items-center justify-between p-2 border-b dark:border-gray-800">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-sm"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
