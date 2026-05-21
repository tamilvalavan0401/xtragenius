

import { useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb() {
  const { pathname } = useLocation()

  const getPageTitle = (path: string) => {
    const routes: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/dashboard/payments": "Payments",
      "/dashboard/payouts": "Payouts",
      "/dashboard/reports": "Reports",
      "/dashboard/invoices": "Invoices",
      "/dashboard/developer-settings": "Developer Settings",
      "/dashboard/settings": "Settings",
      "/dashboard/help": "Help & Support",
      "/dashboard/account": "My Account",
    }
    return routes[path] || "Dashboard"
  }

  const currentPage = getPageTitle(pathname)
  const isHomePage = pathname === "/dashboard"

  return (
    <div className="flex items-center gap-[4px] ">
      <span className="text-[#737373] font-[500] text-[14px] leading-[14px] underline decoration-solid decoration-skip-ink-none ">Home</span>
      {!isHomePage && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#000] font-[500] text-[14px] leading-[14px] underline decoration-solid decoration-skip-ink-none ">{currentPage}</span>
        </>
      )}
      {isHomePage && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#000] font-[500] text-[14px] leading-[14px] underline decoration-solid decoration-skip-ink-none ">Dashboard</span>
        </>
      )}
    </div>
  )
}

