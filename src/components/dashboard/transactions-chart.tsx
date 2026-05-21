"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function TransactionsChart() {
  const [error, setError] = useState<string | null>(null)

  const chartData = [
    { month: "Jan", value: 30000, isHighlighted: false },
    { month: "Feb", value: 18000, isHighlighted: false },
    { month: "Mar", value: 45000, isHighlighted: false },
    { month: "Apr", value: 32000, isHighlighted: false },
    { month: "Jun", value: 28000, isHighlighted: false },
    { month: "Jul", value: 32100, isHighlighted: true },
    { month: "Aug", value: 35000, isHighlighted: false, isPattern: true },
    { month: "Sep", value: 25000, isHighlighted: false, isPattern: true },
    { month: "Oct", value: 30000, isHighlighted: false, isPattern: true },
    { month: "Nov", value: 40000, isHighlighted: false, isPattern: true },
    { month: "Dec", value: 28000, isHighlighted: false, isPattern: true },
  ]

  // Validate chart data
  useEffect(() => {
    const hasInvalidData = chartData.some((data) => data.value < 0)
    if (hasInvalidData) {
      setError("Chart data contains negative values")
    } else {
      setError(null)
    }
  }, [])

  const maxValue = Math.max(...chartData.map((d) => d.value))

  // Animation variants for bars
  const barVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: (i: number) => ({
      height: `${(chartData[i].value / maxValue) * 200}px`,
      opacity: 1,
      transition: {
        height: { duration: 0.5, delay: i * 0.1 },
        opacity: { duration: 0.5, delay: i * 0.1 },
      },
    }),
  }

  return (
    <div className="bg-white h-full flex items-end p-4 relative rounded-[8px]">
      <div className="w-full">
        <div className="">
          <div className="text-[#272727] mb-[34px] absolute top-4 left-4  text-[16px] font-semibold leading-[16px]">
            Transactions Overview
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs absolute top-12 left-4 "
            >
              {error}
            </motion.p>
          )}
        </div>
        <div>
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[#737373]  text-[12px] font-normal leading-[12px]">
              <span>50K</span>
              <span>40K</span>
              <span>30K</span>
              <span>20K</span>
              <span>10K</span>
              <span>0K</span>
            </div>

            {/* Chart bars */}
            <div className="ml-8 h-full flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full max-w-8">
                    {/* Highlighted value tooltip */}
                    {data.isHighlighted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        ₹32,100
                      </motion.div>
                    )}

                    {/* Bar */}
                    <motion.div
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={barVariants}
                      className={`w-full rounded-t ${
                        data.isHighlighted ? "bg-[#284292]" : data.isPattern ? " bg-[#6D93DE] " : "bg-[#6D93DE]"
                      }`}
                      style={{
                        minHeight: "20px",
                        backgroundImage: data.isPattern
                          ? "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(201, 212, 232, 1) 2px, rgba(201, 212, 232, 1) 4px)"
                          : "none",
                      }}
                    />
                  </div>

                  {/* Month label */}
                  <span className="text-xs text-gray-500 text-center">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

