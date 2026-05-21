import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import data from "@/data/overalldata.json";
import { cn } from "@/lib/utils";

// Define the shape of our order data
interface Order {
  id: number;
  createdAt: string;
  settleId: string;
  referenceId: string;
  orderId: string;
  amount: string;
  mode: string;
  payerVpa: string;
  payerName: string;
  transactionDate: string;
  utr: string;
  status: string;
}

const columnHelper = createColumnHelper<Order>();

export const OrdersView = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const orderData = useMemo(() => {
    if (activeTab === "history") return (data as any).orders_history || [];
    if (activeTab === "escalations") return (data as any).orders_escalations || [];
    return data.orders || [];
  }, [activeTab]);

  const columns = [
    columnHelper.accessor("id", {
      header: "S.NO",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "CREATED AT",
    }),
    columnHelper.accessor("settleId", {
      header: "SETTLE ID",
    }),
    columnHelper.accessor("referenceId", {
      header: "REFERENCE ID",
    }),
    columnHelper.accessor("orderId", {
      header: "ORDER ID",
    }),
    columnHelper.accessor("amount", {
      header: "AMOUNT",
    }),
    columnHelper.accessor("mode", {
      header: "MODE",
    }),
    columnHelper.accessor("payerVpa", {
      header: "PAYER VPA",
    }),
    columnHelper.accessor("payerName", {
      header: "PAYER NAME",
    }),
    columnHelper.accessor("transactionDate", {
      header: "TRANSACTION DATE",
    }),
    columnHelper.accessor("utr", {
      header: "UTR",
    }),
    columnHelper.accessor("status", {
      header: "STATUS",
      cell: (info) => (
        <span className={cn(
          "px-2 py-1 rounded text-[12px] font-medium",
          info.getValue() === "Success" ? "bg-green-50 text-green-600" : 
          info.getValue() === "Pending" ? "bg-yellow-50 text-yellow-600" : 
          "bg-red-50 text-red-600"
        )}>
          {info.getValue()}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: orderData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Stats Bar */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-wrap items-center justify-between gap-6 text-[14px]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#272727] dark:text-white">Account</span>
          <div className="w-5 h-5 bg-[#23B04E] rounded-[4px]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#272727] dark:text-white">Balance</span>
          <span className="text-gray-500">₹</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#272727] dark:text-white">Limits</span>
          <span className="text-gray-500">(Min : to Max : )</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#272727] dark:text-white">Last Updated</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#272727] dark:text-white">API</span>
          <div className="w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#272727] dark:text-white">Live</span>
          <span className="text-[#23B04E]">From {currentTime}</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button 
            className={cn(
              "pb-4 flex items-center gap-2 transition-all relative",
              activeTab === "live" ? "text-[#272727] dark:text-white border-b-2 border-[#272727] dark:border-white font-semibold" : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => setActiveTab("live")}
          >
            Live Transactions
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[12px]",
              activeTab === "live" ? "bg-[#272727] text-white" : "bg-gray-100 text-gray-500"
            )}>
              {data.orders.length}
            </span>
          </button>
          
          <button 
            className={cn(
              "pb-4 flex items-center gap-2 transition-all",
              activeTab === "history" ? "text-[#272727] dark:text-white border-b-2 border-[#272727] dark:border-white font-semibold" : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => setActiveTab("history")}
          >
            Transactions History
            <span className="px-2 py-0.5 bg-[#E6F8EF] text-[#23B04E] rounded-full text-[12px]">
              {(data as any).orders_history.length}
            </span>
          </button>

          <button 
            className={cn(
              "pb-4 flex items-center gap-2 transition-all",
              activeTab === "escalations" ? "text-[#272727] dark:text-white border-b-2 border-[#272727] dark:border-white font-semibold" : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => setActiveTab("escalations")}
          >
            Escalations
            <span className="px-2 py-0.5 bg-[#FFF8E6] text-[#EC9517] rounded-full text-[12px]">
              {(data as any).orders_escalations.length}
            </span>
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8FAFC] dark:bg-[#1F2937]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th 
                      key={header.id} 
                      className="px-6 py-4 text-[11px] font-bold text-[#868EA4] uppercase tracking-wider whitespace-nowrap"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-[13px] text-[#272727] dark:text-gray-300 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 italic">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-6 text-[13px] text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors">
              <span>{table.getState().pagination.pageSize}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div>
            {orderData.length > 0 ? (
              <>
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, orderData.length)} of {orderData.length}
              </>
            ) : (
              "0-0 of 0"
            )}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()}
              className="disabled:opacity-30 disabled:cursor-not-allowed hover:text-black transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
              className="disabled:opacity-30 disabled:cursor-not-allowed hover:text-black transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
