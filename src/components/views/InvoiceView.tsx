import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronDown, Eye } from "lucide-react";
import data from "@/data/overalldata.json";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: string;
}

const columnHelper = createColumnHelper<Invoice>();

export const InvoiceView = () => {
  const invoiceData = useMemo(() => data.invoices || [], []);

  const columns = [
    columnHelper.accessor("id", { header: "Invoice ID" }),
    columnHelper.accessor("date", { header: "Date" }),
    columnHelper.accessor("customer", { header: "Customer" }),
    columnHelper.accessor("amount", { header: "Amount" }),
    columnHelper.accessor("status", { 
        header: "Status",
        cell: (info) => (
            <span className={cn(
              "px-2 py-1 rounded text-[12px] font-medium",
              info.getValue() === "Paid" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
            )}>
              {info.getValue()}
            </span>
        )
    }),
    {
      id: "action",
      header: "Action",
      cell: () => (
        <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors">
            <Eye size={16} />
            View
        </button>
      )
    }
  ];

  const table = useReactTable({
    data: invoiceData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#272727] dark:text-white">Invoices</h1>

      <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-6 pt-4 gap-8">
          <button className="pb-4 flex items-center gap-2 border-b-2 border-[#272727] dark:border-white text-[#272727] dark:text-white font-semibold relative">
            Invoices
            <span className="px-2 py-0.5 bg-[#272727] text-white rounded-full text-[12px]">
              {invoiceData.length}
            </span>
          </button>
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
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-400 italic">
                    No invoices found
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
