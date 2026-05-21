import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  Home,
  CreditCard,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  Code,
  HelpCircle,
  Sun,
  Moon,
  Search,
  ShoppingCart,
  Activity,
  FileEdit,
  Wallet,
  Briefcase,
  Ticket,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SvgIcons from "@/components/SvgIcons";
import { useTheme } from "@/api/context/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
  // New props to manage header icons visibility (optional, if controlled externally)
  setHeaderIconsVisible?: (visible: boolean) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  onCollapseChange,
  setHeaderIconsVisible, // Optional prop to control header icons
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // New state for search input
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDarkTheme, toggleTheme } = useTheme();

  const handleCollapseToggle = (newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const menuItems = [
    {
      icon: <SvgIcons.DashboardHome />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Orders",
      href: "/dashboard/orders",
    },
    {
      icon: <SvgIcons.DashboardPayouts />,
      label: "Payouts",
      href: "/dashboard/payouts",
    },
    {
      icon: <Activity size={20} />,
      label: "Reconciliation",
      href: "/dashboard/reconciliation",
    },
    {
      icon: <FileEdit size={20} />,
      label: "Statement",
      href: "/dashboard/statement",
    },
    {
      icon: <Wallet size={20} />,
      label: "Wallet History",
      href: "/dashboard/wallet-history",
    },
    {
      icon: <Briefcase size={20} />,
      label: "Developer Settings",
      href: "/dashboard/developer-settings",
    },
    {
      icon: <Ticket size={20} />,
      label: "Invoice",
      href: "/dashboard/invoices",
    },
    {
      icon: <SvgIcons.DashboardReports />,
      label: "Reports",
      href: "/dashboard/reports",
    },
  ].map((item) => ({ ...item, active: pathname === item.href }));

  const managementItems = [
    {
      icon: <User size={20} />,
      label: "Account Setting",
      href: "/dashboard/settings",
    },
  ].map((item) => ({ ...item, active: pathname === item.href }));

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose();
    setIsSearchActive(false); // Close search on navigation
    setHeaderIconsVisible?.(true); // Restore header icons
  };

  const handleSearchToggle = () => {
    setIsSearchActive(true);
    setHeaderIconsVisible?.(false); // Hide header icons when search is active
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setHeaderIconsVisible?.(true); // Restore header icons
  };

  return (
    <>
      {/* Desktop Sidebar (Unchanged) */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full transition-all duration-300 z-50",
          "bg-white dark:bg-[linear-gradient(180deg,#020618_3.1%,#162456_51.55%,#0F172B_100%)] border-r border-gray-200 dark:border-gray-700",
          collapsed ? "w-16" : "w-64",
          "hidden lg:block"
        )}
      >
        <div>
          {/* Logo */}
          <div
            className={cn(
              "mb-[16px] border-b border-gray-200 dark:border-[#1A2518] flex items-center justify-center py-[21px] relative"
            )}
          >
            <div
              className="flex items-center cursor-pointer gap-[10px]"
              onClick={() => handleNavigation("/dashboard")}
            >
              <div className="dark:hidden block">
                  <SvgIcons.Bluelogo />
              </div>
              <div className="dark:block hidden">
                  <SvgIcons.Whitelogo />
              </div>
              
              {!collapsed && (
                <h2 className="flex text-center text-[#000] font-space-grotesk gap-[2px] dark:text-[#FFFF] text-[24px] font-medium leading-[110%]">
                  <span>Pay</span>
                  <span>Qwick</span>
                </h2>
              )}
            </div>

            {/* Collapse Button Moved to Top Right */}
            <button
              onClick={() => handleCollapseToggle(!collapsed)}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-[#162456] border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-md z-50 hover:bg-gray-50 dark:hover:bg-blue-900 transition-all flex items-center justify-center"
            >
              {collapsed ? (
                <SvgIcons.DashboardCollapsRight className="w-4 h-4 text-gray-500 dark:text-[#BDC9BD]" />
              ) : (
                <SvgIcons.DashboardCollapsLeft className="w-4 h-4 text-gray-500 dark:text-[#BDC9BD]" />
              )}
            </button>
          </div>

          {/* Menu Section */}
          <div className="space-y-1 mb-6">
            {!collapsed && (
              <p className="text-gray-500 dark:text-gray-400  text-[12px] font-medium px-[8px] py-[4px]">
                Menu
              </p>
            )}
            {menuItems.map((item: any, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full justify-start gap-3 border-l-2 border-l-transparent rounded-none cursor-pointer",
                  "text-gray-500 dark:text-[#a4afc6] hover:text-[#000] dark:hover:text-[#fff] dark:hover:bg-[#ffffff06] text-[14px]",
                  item.active &&
                    "text-[#124CBE] dark:text-[#FFFFFF] border-l-2 border-l-[#124CBE] dark:border-l-[#fff] bg-[#F1F5F9] dark:bg-[#FFFFFF1A] hover:bg-[#F1F5F9] dark:hover:bg-[#FFFFFF1A]",
                  collapsed && "justify-center px-2"
                )}
              >
                {item?.icon}
                {!collapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {/* Management Section */}
          <div className="space-y-1 mb-6">
            {!collapsed && (
              <p className="cursor-pointer text-gray-500 dark:text-gray-400  text-[12px] font-medium px-[8px] py-[4px]">
                MANAGEMENT
              </p>
            )}
            {managementItems.map((item: any, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full justify-start gap-3 border-l-2 border-l-transparent rounded-none cursor-pointer",
                  "text-gray-500 dark:text-[#a4afc6] hover:text-[#000] dark:hover:text-[#fff] dark:hover:bg-[#ffffff06] text-[14px]",
                  item.active &&
                    "text-[#124CBE] dark:text-[#FFFFFF] border-l-2 border-l-[#124CBE] dark:border-l-[#fff] bg-[#F1F5F9] dark:bg-[#FFFFFF1A] hover:bg-[#F1F5F9] dark:hover:bg-[#FFFFFF1A]",
                  collapsed && "justify-center px-2"
                )}
              >
                {item?.icon}
                {!collapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-4 left-2 right-4">
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/")}
              className={cn(
                "w-full justify-start gap-3 border-l-2 border-l-transparent rounded-none cursor-pointer",
                "text-[#EF4444] hover:text-[#EF4444] hover:bg-red-50 dark:hover:bg-red-900/10 text-[14px] font-[400]",
                collapsed && "justify-center px-2"
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer (Slide from Left) */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] transform transition-transform duration-300 ease-in-out z-50 lg:hidden shadow-2xl flex flex-col",
          "bg-white dark:bg-[linear-gradient(180deg,#020618_3.1%,#162456_51.55%,#0F172B_100%)] border-r border-gray-200 dark:border-gray-700",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile Header */}
        <div className="p-[20px] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
           <div className="flex items-center gap-[10px]">
              <div className="dark:hidden block">
                  <SvgIcons.Bluelogo />
              </div>
              <div className="dark:block hidden">
                  <SvgIcons.Whitelogo />
              </div>
              <h2 className="flex text-[#000] font-space-grotesk gap-[2px] dark:text-[#FFFF] text-[20px] font-medium">
                <span>Pay</span>
                <span>Qwick</span>
              </h2>
           </div>
           <Button variant="ghost" size="icon" onClick={onClose} className="dark:text-[#a4afc6] dark:hover:text-white">
             <X className="h-5 w-5" />
           </Button>
        </div>

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          {/* Menu Items */}
          <div className="space-y-1 mb-8">
            <p className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider font-semibold px-3 py-2">
              Menu
            </p>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex h-11 px-3 gap-3 items-center justify-start rounded-lg transition-all",
                  "text-gray-600 dark:text-[#BDC9BD] hover:bg-gray-100 dark:hover:bg-white/5",
                  item.active &&
                    "text-[#124CBE] dark:text-white bg-blue-50 dark:bg-white/10 font-medium"
                )}
                onClick={() => {
                  handleNavigation(item.href);
                  onClose();
                }}
              >
                <span className={cn(item.active ? "text-[#124CBE] dark:text-white" : "text-gray-400 dark:text-[#BDC9BD]")}>
                  {item.icon}
                </span>
                <span className="text-[14px]">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Management */}
          <div className="space-y-1 mb-8">
            <p className="text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-wider font-semibold px-3 py-2">
              Management
            </p>
            {managementItems.map((item: any, index) => (
              <button
                key={index}
                className={cn(
                  "w-full flex h-11 px-3 gap-3 items-center justify-start rounded-lg transition-all",
                  "text-gray-600 dark:text-[#BDC9BD] hover:bg-gray-100 dark:hover:bg-white/5",
                  item.active &&
                    "text-[#124CBE] dark:text-white bg-blue-50 dark:bg-white/10 font-medium"
                )}
                onClick={() => {
                  handleNavigation(item.href);
                  onClose();
                }}
              >
                <span className={cn(item.active ? "text-[#124CBE] dark:text-white" : "text-gray-400 dark:text-[#BDC9BD]")}>
                  {item.icon}
                </span>
                <span className="text-[14px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Footer with Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
           <Button
              variant="ghost"
              onClick={() => { 
                handleNavigation("/"); 
                onClose(); 
              }}
              className="w-full justify-start gap-3 text-[#EF4444] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors h-12"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </Button>
        </div>
      </div>
    </>
  );
}

