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

interface Reconciliation {
  id: number;
  createdAt: string;
  settleId: string;
  bankId: string;
  reference: string;
  amount: string;
  payable: string;
  utr: string;
  settledDate: string;
  response: string;
}

const columnHelper = createColumnHelper<Reconciliation>();

export const ReconciliationView = () => {
  const [filterValue, setFilterValue] = useState("");
  const reconciliationData = useMemo(() => {
    const rawData = (data as any).reconciliation || [];
    if (!filterValue) return rawData;
    return rawData.filter((item: any) => 
      item.settledDate.startsWith(filterValue)
    );
  }, [filterValue]);

  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("createdAt", { header: "CREATED AT" }),
    columnHelper.accessor("settleId", { header: "SETTLE ID" }),
    columnHelper.accessor("bankId", { header: "BANK ID" }),
    columnHelper.accessor("reference", { header: "REFERENCE" }),
    columnHelper.accessor("amount", { header: "AMOUNT" }),
    columnHelper.accessor("payable", { header: "PAYABLE" }),
    columnHelper.accessor("utr", { header: "UTR" }),
    columnHelper.accessor("settledDate", { header: "SETTLED DATE" }),
    columnHelper.accessor("response", { 
      header: "RESPONSE",
      cell: (info) => (
        <span className={cn(
          "px-2 py-1 rounded text-[12px] font-medium",
          info.getValue() === "Success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
        )}>
          {info.getValue()}
        </span>
      )
    }),
  ];

  const table = useReactTable({
    data: reconciliationData,
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
      <h1 className="text-2xl font-bold text-[#272727] dark:text-white">Reconciliation</h1>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button className="pb-4 flex items-center gap-2 border-b-2 border-[#272727] dark:border-white text-[#272727] dark:text-white font-semibold relative">
            Reconciliation
            <span className="px-2 py-0.5 bg-[#272727] text-white rounded-full text-[12px]">
              {reconciliationData.length}
            </span>
          </button>
        </div>

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

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-6 text-[13px] text-gray-600 dark:text-gray-400 font-plus-jakarta">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#272727] dark:hover:text-white transition-colors">
              <span>{table.getState().pagination.pageSize}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div>
             {reconciliationData.length > 0 ? (
                <>
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, reconciliationData.length)} of {reconciliationData.length}
                </>
             ) : "0-0 of 0"}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()} 
              className="disabled:opacity-30 hover:text-[#272727] dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()} 
              className="disabled:opacity-30 hover:text-[#272727] dark:hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
