import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronDown, Download } from "lucide-react";
import data from "@/data/overalldata.json";
import { cn } from "@/lib/utils";

interface WalletEntry {
  id: number;
  createdAt: string;
  reference: string;
  txnType: string;
  opening: string;
  amount: string;
  closing: string;
  remarks: string;
  status: string;
  txnDate: string;
  updatedAt: string;
}

const columnHelper = createColumnHelper<WalletEntry>();

export const WalletHistoryView = () => {
  const [filterValue, setFilterValue] = useState("");
  const walletData = useMemo(() => {
    const rawData = (data as any).walletHistory || [];
    if (!filterValue) return rawData;
    return rawData.filter((item: any) => 
      item.txnDate.startsWith(filterValue)
    );
  }, [filterValue]);

  const columns = [
    columnHelper.accessor("id", { header: "S.NO" }),
    columnHelper.accessor("createdAt", { header: "CREATED AT" }),
    columnHelper.accessor("reference", { header: "REFERENCE" }),
    columnHelper.accessor("txnType", { header: "TXN TYPE" }),
    columnHelper.accessor("opening", { header: "OPENING" }),
    columnHelper.accessor("amount", { header: "AMOUNT" }),
    columnHelper.accessor("closing", { header: "CLOSING" }),
    columnHelper.accessor("remarks", { header: "REMARKS" }),
    columnHelper.accessor("status", { 
        header: "STATUS",
        cell: (info) => (
            <span className={cn(
              "px-2 py-1 rounded text-[12px] font-medium",
              info.getValue() === "Success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}>
              {info.getValue()}
            </span>
        )
    }),
    columnHelper.accessor("txnDate", { header: "TXN DATE" }),
    columnHelper.accessor("updatedAt", { header: "UPDATED AT" }),
  ];

  const table = useReactTable({
    data: walletData,
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
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Wallet Account Details */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#272727] dark:text-white mb-3 text-[15px]">Wallet Funding Account Details</h3>
            <div className="text-[13px] space-y-2 text-gray-500 dark:text-gray-400">
              <div className="flex gap-2"><span>Bank Name:</span> <span className="text-[#272727] dark:text-white">-</span></div>
              <div className="flex gap-2"><span>Account Name:</span> <span className="text-[#272727] dark:text-white">-</span></div>
              <div className="flex gap-2"><span>Account No:</span> <span className="text-[#272727] dark:text-white">-</span></div>
              <div className="flex gap-2"><span>IFSC:</span> <span className="text-[#272727] dark:text-white">-</span></div>
            </div>
          </div>

          {/* Balance & Last Updated */}
          <div className="space-y-6">
            <div className="flex flex-col">
               <span className="font-bold text-[#272727] dark:text-white text-[15px]">Wallet Balance <span className="text-gray-400 font-normal ml-1">₹</span></span>
            </div>
            <div className="flex flex-col">
               <span className="font-bold text-[#272727] dark:text-white text-[15px]">Last Updated</span>
            </div>
          </div>

          {/* Documentation Button */}
          <div className="flex justify-end items-start">
            <button className="bg-[#020618] hover:bg-blue-900 text-white px-4 py-2 rounded-full flex items-center gap-2 text-[13px] transition-colors shadow-lg">
              <Download size={16} />
              Documentation V 1.1
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button className="pb-4 flex items-center gap-2 border-b-2 border-[#272727] dark:border-white text-[#272727] dark:text-white font-semibold relative">
            Wallet History
            <span className="px-2 py-0.5 bg-[#272727] text-white rounded-full text-[12px]">
              {walletData.length}
            </span>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6">
           <div className="max-w-[240px]">
              <input 
                type="date" 
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] dark:bg-[#1F2937] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
           </div>
        </div>

        {/* Table */}
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
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                       <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-gray-200 dark:text-gray-700">
                            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                            <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                       </div>
                       <span className="text-gray-400 font-medium font-plus-jakarta">No Data</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-6 text-[13px] text-gray-600 dark:text-gray-400 font-plus-jakarta">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#272727] dark:hover:text-white transition-colors">
              <span>{table.getState().pagination.pageSize}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div>
             {walletData.length > 0 ? (
                <>
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, walletData.length)} of {walletData.length}
                </>
             ) : "0-0 of 0"}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="disabled:opacity-30 hover:text-[#272727] dark:hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="disabled:opacity-30 hover:text-[#272727] dark:hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
