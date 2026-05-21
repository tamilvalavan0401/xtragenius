import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronDown, Download, Filter } from "lucide-react";
import data from "@/data/overalldata.json";
import { cn } from "@/lib/utils";

interface Report {
  id: number;
  createdAt: string;
  from: string;
  to: string;
  source: string;
  total: string;
  file: string;
  status: string;
}

const columnHelper = createColumnHelper<Report>();

export const ReportsView = () => {
  const [reportSource, setReportSource] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const reportData = useMemo(() => {
    const rawData = (data as any).reports || [];
    if (!reportSource) return rawData;
    return rawData.filter((item: any) => 
      item.source.toLowerCase().includes(reportSource.toLowerCase())
    );
  }, [reportSource]);

  const columns = [
    columnHelper.accessor("createdAt", { header: "CREATED AT" }),
    columnHelper.accessor("from", { header: "FROM" }),
    columnHelper.accessor("to", { header: "TO" }),
    columnHelper.accessor("source", { header: "SOURCE" }),
    columnHelper.accessor("total", { header: "TOTAL" }),
    columnHelper.accessor("file", { 
        header: "FILE",
        cell: (info) => (
            <button className="text-blue-500 flex items-center gap-1 hover:underline">
                <Download size={14} />
                {info.getValue()}
            </button>
        )
    }),
    columnHelper.accessor("status", { 
        header: "STATUS",
        cell: (info) => (
            <span className="text-green-600 font-medium">{info.getValue()}</span>
        )
    }),
  ];

  const table = useReactTable({
    data: reportData,
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
      <h1 className="text-2xl font-bold text-[#272727] dark:text-white">Reports</h1>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button className="pb-4 flex items-center gap-2 border-b-2 border-[#272727] dark:border-white text-[#272727] dark:text-white font-semibold relative">
            Reports
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-6 flex flex-wrap items-end gap-4">
           <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-gray-500 font-medium">From Date</span>
              <input type="date" defaultValue="2026-05-11" className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] dark:bg-[#1F2937] dark:text-white" />
           </div>
           <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-gray-500 font-medium">To Date</span>
              <input type="date" defaultValue="2026-05-11" className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] dark:bg-[#1F2937] dark:text-white" />
           </div>
           <div className="flex flex-col gap-1.5 min-w-[200px] relative">
              <span className="text-[12px] text-gray-500 font-medium">Select Option</span>
              <div 
                className="group relative"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-[13px] dark:bg-[#1F2937] dark:text-white focus:outline-none bg-white transition-all hover:border-gray-300"
                >
                  <span>{reportSource || "All Sources"}</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-300",
                    showDropdown && "rotate-180"
                  )} />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 w-full bg-white dark:bg-[#1F2937] border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl z-10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div 
                      onClick={() => { setReportSource(""); setShowDropdown(false); }}
                      className="px-3 py-2 text-[13px] hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      All Sources
                    </div>
                    <div 
                      onClick={() => { setReportSource("Wallet History"); setShowDropdown(false); }}
                      className="px-3 py-2 text-[13px] hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      Wallet History
                    </div>
                    <div 
                      onClick={() => { setReportSource("Disbursals"); setShowDropdown(false); }}
                      className="px-3 py-2 text-[13px] hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      Disbursals
                    </div>
                  </div>
                )}
              </div>
           </div>
           <button className="bg-[#020618] text-white px-8 py-2 rounded-lg text-[13px] font-medium hover:bg-blue-900 transition-colors h-[38px]">
              Request
           </button>
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
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 italic">
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
