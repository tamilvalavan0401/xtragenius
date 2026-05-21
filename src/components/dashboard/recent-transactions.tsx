import { Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SvgIcons from "@/components/SvgIcons"

export default function RecentTransactions() {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-[rgba(255, 255, 255, 0.10)] text-green-800 hover:bg-[rgba(255, 255, 255, 0.10)]">Success</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      case "Pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="bg-white rounded-[8px]">
      <div>
        <div className="flex p-4  flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-[#272727]   text-[16px] font-semibold">Recent Transactions</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search" className="pl-10 w-full sm:w-64" />
            </div>
            <Button variant="outline" className="text-[#272727] border-[#EBEBEB] rounde-[8px]  text-[14px] font-normal"
 size="sm">
              Filter
              <SvgIcons.DashboardFilter/>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F6F7] px-[10px]">
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">SI No</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Transaction ID</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Customer Name</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Date & Time</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Amount</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Status</th>
                <th className="text-[#737373]  px-4  text-start text-[14px] font-normal py-[16px] ">Method</th>
              </tr>
            </thead>
            <tbody className="px-4">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b  px-4 border-gray-100 hover:bg-gray-50">
                  <td className="text-[#272727]  px-4  text-[14px] font-medium">{transaction.id}</td>
                  <td className="text-[#272727]  px-4  text-[14px] font-medium">{transaction.transactionId}</td>
                  <td className="text-[#272727]  px-4  text-[14px] font-medium">{transaction.customerName}</td>
                  <td className="text-[#272727]  px-4  text-[14px] font-medium">{transaction.dateTime}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{transaction.amount}</td>
                  <td className="py-3 px-4">{getStatusBadge(transaction.status)}</td>
                  <td className="text-[#272727]  px-4  text-[14px] font-medium">{transaction.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

