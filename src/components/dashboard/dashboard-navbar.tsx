

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./breadcrumb";
import SvgIcons from "@/components/SvgIcons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Bars, ThreeCircles } from "react-loader-spinner";
import { logout } from "@/api/service/authService";
import { useUser } from "@/api/context/UserContext";
import { useTheme } from "@/api/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardNavbar({ sidebarOpen, setSidebarOpen }: DashboardNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, token, email, clearUserData } = useUser();
  const navigate = useNavigate();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSearchMobileActive, setIsSearchMobileActive] = useState(true);


  // Add this ref to track the input element
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Refs for dropdown elements
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to handle body scroll when dropdowns are open
  useEffect(() => {
    if (showProfileDropdown || showNotifications) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showProfileDropdown, showNotifications]);

  // Effect to handle click outside for closing dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        notificationsDropdownRef.current &&
        !notificationsDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token) {
        // toast.error("No token found. Please log in.", { duration: 4000 });
        navigate("/");
        return;
      }
    };

    checkTokenValidity();
  }, [token, clearUserData, navigate]);

  const validateSearchQuery = (query: string) => {
    if (!query.trim()) {
      return "Search query cannot be empty";
    }
    if (query.trim().length < 3) {
      return "Search query must be at least 3 characters long";
    }
    return null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateSearchQuery(searchQuery);
    if (error) {
      setSearchError(error);
      toast.error(error, { duration: 4000 });
      return;
    }
    setSearchError(null);
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = async () => {
    if (!token) {
      // toast.error("No token found. Please log in again.", { duration: 4000 });
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const response = await logout(token);
      if (response.success) {
        clearUserData();
        toast.success(response.message, { duration: 4000 });
        navigate("/");
      } else {
        throw new Error(response.message || "Logout failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Logout failed. Please try again.";
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  // Handlers for mutual exclusivity
  const handleProfileClick = () => {
    setShowProfileDropdown((prev) => !prev);
    setShowNotifications(false); // Close notifications when profile is toggled
  };

  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfileDropdown(false); // Close profile when notifications is toggled
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="sticky top-0 bg-white z-30 ">
      <header className="sticky top-0 lg:bg-white px-[24px] py-[15px] z-30 ">
        <div className="flex items-center justify-between">
          {isSearchMobileActive && (<div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 "
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <nav className="text-sm text-gray-500  hidden md:block">
              <Breadcrumb />
            </nav>
          </div>)}

          <div className="flex w-full md:w-fit items-center gap-6">
                       <motion.form
              onSubmit={handleSearch}
              className="relative w-full md:w-fit block md:hidden"
              animate={searchError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <motion.input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchError(null);
                  if (e.target.value.length > 0) {
                    setIsSearchActive(true); // Keep active if there's text
                  }
                }}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => {
                  if (searchQuery.length === 0) {
                    setIsSearchActive(false); // Deactivate only if input is empty
                  }
                }}
                ref={searchInputRef}
                placeholder="Search..."
                className={cn(
                  `h-8 py-2  rounded-md ${isSearchActive ? "border-transparent border" : "border-gray-300"} text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 px-3 focus:ring-[#124cbe] bg-white  text-gray-900 `,
                   searchError && "border-red-500"
                )}
                animate={{ width: isSearchActive ? "100%" : "0px" }} // Animate width
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <button
                type="button" // Changed to type="button" to prevent form submission
                onClick={() => {
                  setIsSearchMobileActive(false); 
                  setIsSearchActive(true);// Activate search on icon click
                  searchInputRef.current?.focus(); // Focus the input
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-[#FFFFFF] dark:hover:text-gray-100"
                aria-label="Search"
              >
                <SvgIcons.DashboardSearch />
              </button>
              <button
                type="submit"
                className="sr-only" // Hidden submit button for form submission (e.g., on Enter)
                aria-label="Submit search"
              >
                Submit
              </button>
              {searchError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute text-red-500 text-xs mt-1 left-0"
                >
                  {searchError}
                </motion.p>
              )}

            </motion.form>
     
           <motion.form
              onSubmit={handleSearch}
              className="relative hidden md:block"
              animate={searchError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <motion.input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchError(null);
                  if (e.target.value.length > 0) {
                    setIsSearchActive(true); // Keep active if there's text
                  }
                }}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => {
                  if (searchQuery.length === 0) {
                    setIsSearchActive(false); // Deactivate only if input is empty
                  }
                }}
                ref={searchInputRef}
                placeholder="Search..."
                className={cn(
                  `h-8 py-2  rounded-md ${isSearchActive ? "border-transparent border" : "border-gray-300"} text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#124cbe] bg-white px-3 text-gray-900 `,
                  searchError && "border-red-500"
                )}
                animate={{ width: isSearchActive ? "200px" : "0px" }} // Animate width
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <button
                type="button" // Changed to type="button" to prevent form submission
                onClick={() => {
                  setIsSearchActive(true); // Activate search on icon click
                  searchInputRef.current?.focus(); // Focus the input
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-[#FFFFFF] dark:hover:text-gray-100"
                aria-label="Search"
              >
                <SvgIcons.DashboardSearch />
              </button>
              <button
                type="submit"
                className="sr-only" // Hidden submit button for form submission (e.g., on Enter)
                aria-label="Submit search"
              >
                Submit
              </button>
              {searchError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute text-red-500 text-xs mt-1 left-0"
                >
                  {searchError}
                </motion.p>
              )}

            </motion.form>
            {isSearchMobileActive && (<>

            <div className="relative" ref={notificationsDropdownRef}>
              <button
                onClick={handleNotificationsClick}
                className="p-2 rounded-md hover:bg-gray-100  relative"
                aria-label="Notifications"
              >
                <SvgIcons.DashboardNotification />
                <span className="absolute top-0 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              {showNotifications && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200   z-50"
                >
                  <div className="p-4 border-b border-gray-200 ">
                    <h3 className="font-semibold text-gray-900 ">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50  border-b border-gray-100 ">
                      <p className="text-sm font-medium text-gray-900 ">Payment Received</p>
                      <p className="text-xs text-gray-500 ">₹32,100 received from John Doe</p>
                      <p className="text-xs text-gray-400  mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50  border-b border-gray-100 ">
                      <p className="text-sm font-medium text-gray-900 ">Transaction Failed</p>
                      <p className="text-xs text-gray-500 ">Payment to Alex Smith failed</p>
                      <p className="text-xs text-gray-400  mt-1">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 ">
                      <p className="text-sm font-medium text-gray-900 ">New User Registered</p>
                      <p className="text-xs text-gray-500 ">Emma Johnson joined your platform</p>
                      <p className="text-xs text-gray-400  mt-1">3 hours ago</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={handleProfileClick}
                className="w-8 h-8 bg-[#284292] rounded-full flex items-center justify-center hover:bg-[#6D93DE] transition-colors"
                aria-label="Profile"
              >
                <span className="text-white text-sm font-medium">
                  {mounted ? (user?.name?.charAt(0)?.toUpperCase() || "U") : "U"}
                </span>
              </button>

              {showProfileDropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-gray-200  shadow-lg py-4 z-50"
                >
                  <div className="flex mb-4 items-start gap-2 px-4">
                    <div className="w-8 h-8 text-white bg-[#284292] rounded-full flex items-center justify-center hover:bg-[#6D93DE] transition-colors">
                      {mounted ? (user?.name?.charAt(0)?.toUpperCase() || "U") : "U"}
                    </div>
                    <div>
                      <p className="text-gray-900   text-[14px] font-semibold">
                        {user?.name || "User"}
                      </p>
                      <p className="text-gray-500  text-[12px] font-normal">
                        {email || user?.email || "email@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      className="flex h-10 py-2 px-4 items-center gap-2 text-black  hover:bg-gray-100   text-[14px] font-normal"
                    >
                      <SvgIcons.DashboardHome />
                      Home
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex h-10 py-2 px-4 items-center gap-2 text-black  hover:bg-gray-100   text-[14px] font-normal"
                    >
                      <SvgIcons.DashboardSettings />
                      Settings
                    </Link>
                    <Link
                      to="/dashboard/developer-settings"
                      className="flex h-10 py-2 px-4 items-center gap-2 text-black  hover:bg-gray-100   text-[14px] font-normal"
                    >
                      <SvgIcons.DashboardDev />
                      Developer Settings
                    </Link>
                    <Link
                      to="/dashboard/help-support"
                      className="flex h-10 py-2 px-4 items-center gap-2 text-black  hover:bg-gray-100   text-[14px] font-normal"
                    >
                      <SvgIcons.DashboardHelp />
                      Help & Support
                    </Link>
                    <button
                      type="button"
                      className="flex justify-between h-10 px-4 items-center gap-2 w-full text-black  hover:bg-gray-100   text-[14px] font-normal"
                    >
                      <div className="flex gap-2 items-center">
                        {!isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        {!isDarkTheme ? "Navbar Light" : "Navbar Dark"}
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-block w-11 h-6 cursor-pointer">
                          <input
                            onClick={toggleTheme}
                            type="checkbox"
                            id="hs-small-switch-with-icons"
                            className="peer sr-only"
                          />
                          <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-[#124CBE] dark:bg-neutral-700 dark:peer-checked:bg-[#124CBE] peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                          <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
                          <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-white transition-colors duration-200 dark:text-white">
                            <svg
                              className="shrink-0 size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </span>
                          <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center size-5 text-gray-500 peer-checked:text-[#284292] transition-colors duration-200 dark:text-neutral-500">
                            <svg
                              className="shrink-0 size-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className={cn(
                        "flex h-10 py-2 items-center px-4 gap-2 w-full text-red-500 dark:text-red-400  text-[14px] font-[500] hover:bg-gray-100 ",
                        loading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <SvgIcons.DashboardLogOut />
                      {loading ? (
                        <Bars
                          visible={true}
                          height="20"
                          width="20"
                          color="#ff0000"
                          ariaLabel="bars-loading"
                        />
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

</>)} 
          </div>
        </div>
      </header>
    </div>
  );
}

