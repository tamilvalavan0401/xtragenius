"use client"

import { useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"

const transactions = [
  {
    id: 1,
    transactionId: "TD123456",
    customerName: "John Doe",
    dateTime: "20 Aug 2025 - 12:45 AM",
    amount: "₹32,100",
    status: "Success",
    method: "UPI",
  },
  {
    id: 2,
    transactionId: "TD123456",
    customerName: "Alex Smith",
    dateTime: "15 Sep 2024 - 03:30 PM",
    amount: "₹320",
    status: "Failed",
    method: "Credit Card",
  },
  {
    id: 3,
    transactionId: "TD123456",
    customerName: "Emma Johnson",
    dateTime: "10 Oct 2024 - 09:00 AM",
    amount: "₹2000",
    status: "Pending",
    method: "Debit Card",
  },
  {
    id: 4,
    transactionId: "TD123456",
    customerName: "Liam Brown",
    dateTime: "5 Nov 2023 - 06:15 PM",
    amount: "₹32,100",
    status: "Success",
    method: "UPI",
  },
]

export default function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[rgba(255, 255, 255, 0.10)] text-green-800">
            <div className="w-1.5 h-1.5 bg-[#284292] rounded-full mr-1"></div>
            Success
          </span>
        )
      case "Failed":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1"></div>
            Failed
          </span>
        )
      case "Pending":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
            Pending
          </span>
        )
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent"
              />
            </div>

            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SI No</th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("transactionId")}
              >
                <div className="flex items-center gap-1">
                  Transaction ID
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("customerName")}
              >
                <div className="flex items-center gap-1">
                  Customer Name
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("dateTime")}
              >
                <div className="flex items-center gap-1">
                  Date & Time
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1">
                  Amount
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("method")}
              >
                <div className="flex items-center gap-1">
                  Method
                  <ChevronDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.transactionId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.dateTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(transaction.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs bg-green-600 h-1 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

