"use client"

import { TrendingUp, TrendingDown, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SvgIcons from "@/components/SvgIcons"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function StatsCards() {
  const [errors, setErrors] = useState<string[]>([])

  const stats = [
    {
      icon: <SvgIcons.DashboardEarns />,
      title: "Total Earnings",
      value: "₹2,40,000",
      change: "1.5%",
      isPositive: true,
      period: "Last Month",
      border: "0.8px solid #F2E2CC",
      bgcolor: "#FBF3E7",
    },
    {
      icon: <SvgIcons.DashboardTotal />,
      title: "Total Transactions",
      value: "325",
      change: "1.5%",
      isPositive: true,
      period: "Last Month",
      border: "0.8px solid #CCDCF2",
      bgcolor: "#E7F0FB",
    },
    {
      icon: <SvgIcons.DashboardSuccess />,
      title: "Success Rate",
      value: "99.8%",
      change: "1.5%",
      isPositive: true,
      period: "Last Month",
      border: "0.8px solid #CCF2DF",
      bgcolor: "#E7FBF1",
    },
    {
      icon: <SvgIcons.DashboardRefund />,
      title: "Refund Processed",
      value: "₹2,100",
      change: "1.5%",
      isPositive: false,
      period: "Last Month",
      border: "0.8px solid #F2CCDC",
      bgcolor: "#FBE7F0",
    },
  ]

  // Validation function
  useEffect(() => {
    const newErrors: string[] = []

    stats.forEach((stat, index) => {
      if (stat.title === "Total Earnings" || stat.title === "Refund Processed") {
        const value = parseFloat(stat.value.replace("₹", "").replace(",", ""))
        if (isNaN(value) || value < 0) {
          newErrors.push(`Invalid ${stat.title} value at card ${index + 1}`)
        }
      }
      if (stat.title === "Total Transactions") {
        const value = parseInt(stat.value)
        if (isNaN(value) || value < 0) {
          newErrors.push(`Invalid ${stat.title} value at card ${index + 1}`)
        }
      }
      if (stat.title === "Success Rate") {
        const value = parseFloat(stat.value.replace("%", ""))
        if (isNaN(value) || value < 0 || value > 100) {
          newErrors.push(`Invalid ${stat.title} value at card ${index + 1}`)
        }
      }
      const change = parseFloat(stat.change.replace("%", ""))
      if (isNaN(change) || change < 0) {
        newErrors.push(`Invalid change percentage at card ${index + 1}`)
      }
    })

    setErrors(newErrors)
  }, [])

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-red-500 text-xs  mb-4"
        >
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </motion.div>
      )}
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-[8px]"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-[16px]">
              <div style={{ border: stat.border, backgroundColor: stat.bgcolor }} className={`rounded-[4px] p-1.5`}>
                {stat.icon}
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 h-auto p-1">
                <span className="rounded-[4px] border border-[#EBEBEB] bg-white flex p-2 justify-center items-center gap-[6px] text-[#272727]  text-[14px] font-normal leading-[14px]">
                  {stat.period} <ChevronDown className="h-3 w-3" />
                </span>
              </Button>
            </div>

            <div className="flex items-end mb-[16px] justify-between w-full">
              <div>
                <p className="text-[#737373]  text-[14px] font-normal leading-[14px] mb-[4px]">
                  {stat.title}
                </p>
                <p className="text-[#272727]  text-[24px] font-bold leading-[24px]">
                  {stat.value}
                </p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.isPositive ? "text-[#124cbe]" : "text-red-600"}`}>
                {stat.isPositive ? (
                  <SvgIcons.DashboardGrowArrow className="h-3 w-3" />
                ) : (
                  <SvgIcons.DashboardGrowArrow className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>

            <div className="flex p-2 justify-center items-center gap-1 rounded bg-[#F4F4F6] text-[#272727]  text-[14px] font-medium leading-[15px]">
              See More <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

