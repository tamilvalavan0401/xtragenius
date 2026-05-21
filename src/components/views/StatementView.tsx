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

interface Statement {
  transactionId: string;
  transactionDate: string;
  valueDate: string;
  transactionType: string;
  remarks: string;
  transactionRNo: string;
  transactionMode: string;
  transactionAmount: string;
  runningBalance: string;
}

const columnHelper = createColumnHelper<Statement>();

export const StatementView = () => {
  const [filterValue, setFilterValue] = useState("");
  const statementData = useMemo(() => {
    const rawData = (data as any).statements || [];
    if (!filterValue) return rawData;
    return rawData.filter((item: any) => 
      item.transactionDate.startsWith(filterValue)
    );
  }, [filterValue]);

  const columns = [
    columnHelper.accessor("transactionId", { header: "Transaction Id" }),
    columnHelper.accessor("transactionDate", { header: "Transaction Date" }),
    columnHelper.accessor("valueDate", { header: "Value Date" }),
    columnHelper.accessor("transactionType", { 
        header: "Transaction Type",
        cell: (info) => (
            <span className={cn(
                "font-medium",
                info.getValue() === "CR" ? "text-green-600" : "text-red-600"
            )}>
                {info.getValue()}
            </span>
        )
    }),
    columnHelper.accessor("remarks", { header: "Remarks" }),
    columnHelper.accessor("transactionRNo", { header: "Transaction R.No" }),
    columnHelper.accessor("transactionMode", { header: "Transaction Mode" }),
    columnHelper.accessor("transactionAmount", { header: "Transaction Amount" }),
    columnHelper.accessor("runningBalance", { header: "Running Balance" }),
  ];

  const table = useReactTable({
    data: statementData,
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
      <h1 className="text-2xl font-bold text-[#272727] dark:text-white">Statement</h1>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button className="pb-4 flex items-center gap-2 border-b-2 border-[#272727] dark:border-white text-[#272727] dark:text-white font-semibold relative">
            Statement
            <span className="px-2 py-0.5 bg-[#272727] text-white rounded-full text-[12px]">
              {statementData.length}
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
             {statementData.length > 0 ? (
                <>
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, statementData.length)} of {statementData.length}
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
