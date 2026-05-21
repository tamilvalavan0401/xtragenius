import SvgIcons from '@/components/SvgIcons';
import axiosInstance, { AK } from '@/api/axiosInstance';
import React, { useCallback, useEffect, useState } from 'react';

interface Payments {
  id: number;
  payoutId: string;
  beneficiaryName: string;
  mode: string;
  dateTime: string;
  amount: string;
  status: 'Success' | 'Failed' | 'Pending';
  upi: string;
}

type Filters = {
  status: string | null;
  mode: string | null;
  sortName: 'asc' | 'desc' | null;
  sortDate: 'asc' | 'desc' | null;
  startDate: string | null;
  endDate: string | null;
};

const InvoiceTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'completed' | 'upcoming'>('completed');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    status: null,
    mode: null,
    sortName: null,
    sortDate: null,
    startDate: null,
    endDate: null,
  });
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesData, setInvoicesData] = useState<Payments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  const fetchInvoicesData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.post(AK.INVOICE); // Using AK.INVOICE
      const { success, data } = response.data;

      if (success && data.invoices) {
        // Assuming data.invoices is an array matching the Payments interface
        setInvoicesData(data.invoices);
      } else {
        setError('No data found.');
        setInvoicesData([]);
      }
    } catch (error) {
      console.error('Error fetching invoices data:', error);
      setError('An error occurred while fetching invoices data.');
      setInvoicesData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchInvoicesData();
  }, [fetchInvoicesData]);

  const parseDate = (dateStr: string): Date => {
    const [datePart, timePart] = dateStr.split(' - ');
    const [day, monthStr, year] = datePart.split(' ');
    const months: { [key: string]: number } = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    let [time, ampm] = timePart.split(' ');
    let [hour, min] = time.split(':').map(Number);
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return new Date(parseInt(year), months[monthStr], parseInt(day), hour, min);
  };

  const currentDate = new Date(2025, 7, 22); // August 22, 2025

  let filteredData = invoicesData.filter((item) => {
    const itemDate = parseDate(item.dateTime);
    if (activeTab === 'upcoming') {
      return itemDate > currentDate;
    } else {
      return itemDate <= currentDate;
    }
  });

  if (search) {
    filteredData = filteredData.filter(
      (item) =>
        item.beneficiaryName.toLowerCase().includes(search.toLowerCase()) ||
        item.payoutId.includes(search)
    );
  }

  if (filters.status) {
    filteredData = filteredData.filter((item) => item.status === filters.status);
  }

  if (filters.mode) {
    filteredData = filteredData.filter((item) => item.mode === filters.mode);
  }

  if (filters.startDate || filters.endDate) {
    const start = filters.startDate ? new Date(filters.startDate) : new Date(0);
    const end = filters.endDate ? new Date(filters.endDate) : new Date();
    filteredData = filteredData.filter((item) => {
      const itemDate = parseDate(item.dateTime);
      return itemDate >= start && itemDate <= end;
    });
  }

  if (filters.sortName) {
    filteredData.sort((a, b) => {
      if (filters.sortName === 'asc') {
        return a.beneficiaryName.localeCompare(b.beneficiaryName);
      } else {
        return b.beneficiaryName.localeCompare(a.beneficiaryName);
      }
    });
  }

  if (filters.sortDate) {
    filteredData.sort((a, b) => {
      const dateA = parseDate(a.dateTime).getTime();
      const dateB = parseDate(b.dateTime).getTime();
      return filters.sortDate === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setShowFilterPopup(false);
    setCurrentPage(1);
  };

  const FilterPopup: React.FC<{
    onClose: () => void;
    onApply: (filters: Filters) => void;
  }> = ({ onClose, onApply }) => {
    const [tempFilters, setTempFilters] = useState<Filters>(filters);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={tempFilters.status || ''}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, status: e.target.value || null })
              }
            >
              <option value="">All</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mode</label>
            <select
              className="w-full p-2 border rounded"
              value={tempFilters.mode || ''}
              onChange={(e) =>
                setTempFilters({ ...tempFilters, mode: e.target.value || null })
              }
            >
              <option value="">All</option>
              <option value="NEFT">NEFT</option>
              <option value="IMPS">IMPS</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sort Name</label>
            <select
              className="w-full p-2 border rounded"
              value={tempFilters.sortName || ''}
              onChange={(e) =>
                setTempFilters({
                  ...tempFilters,
                  sortName: e.target.value as 'asc' | 'desc' | null,
                })
              }
            >
              <option value="">None</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sort Date</label>
            <select
              className="w-full p-2 border rounded"
              value={tempFilters.sortDate || ''}
              onChange={(e) =>
                setTempFilters({
                  ...tempFilters,
                  sortDate: e.target.value as 'asc' | 'desc' | null,
                })
              }
            >
              <option value="">None</option>
              <option value="asc">Oldest to Newest</option>
              <option value="desc">Newest to Oldest</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={tempFilters.startDate || ''}
              onChange={(e) =>
                setTempFilters({
                  ...tempFilters,
                  startDate: e.target.value || null,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={tempFilters.endDate || ''}
              onChange={(e) =>
                setTempFilters({
                  ...tempFilters,
                  endDate: e.target.value || null,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-[#124CBE] text-white rounded"
              onClick={() => onApply(tempFilters)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <p>Loading invoices...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center py-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && (
        <div className="bg-white rounded-[8px]">
          <div className="flex flex-col md:flex-row justify-between p-4 items-center">
            <div className="flex bg-[#EBEBEB] rounded-[4px] border border-[#EBEBEB] items-center gap-2 text-[#272727]  text-[16px] font-semibold">
              <button
                className={`flex items-center gap-2 h-[36px] px-[16px] py-[8px] ${
                  activeTab === 'completed' ? 'bg-white rounded-[4px]' : ''
                }`}
                onClick={() => setActiveTab('completed')}
              >
                <div className="text-[#272727]  text-[14px] font-medium leading-[14px]">
                  Completed
                </div>
                <div
                  className={`${
                    activeTab === 'completed' ? 'bg-[#] rounded-[4px]' : ''
                  } bg-[#CDCDCD] w-[30px] h-[30px] flex items-center justify-center rounded-[4px] p-[4px]`}
                >
                  {invoicesData.filter((item) => parseDate(item.dateTime) <= currentDate).length}
                </div>
              </button>
              <button
                className={`flex items-center gap-2 h-[36px] px-[16px] py-[8px] ${
                  activeTab === 'upcoming' ? 'bg-white rounded-[4px]' : ''
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                <div className="text-[#272727]  text-[14px] font-medium leading-[14px]">
                  Upcoming
                </div>
                <div
                  className={`${
                    activeTab === 'upcoming' ? 'bg-[#] rounded-[4px]' : ''
                  } bg-[#CDCDCD] w-[30px] h-[30px] flex items-center justify-center rounded-[4px] p-[4px]`}
                >
                  {invoicesData.filter((item) => parseDate(item.dateTime) > currentDate).length}
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 border border-[#EBEBEB] rounded bg-white placeholder:text-[#737373] text-[14px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="px-4 py-2 border border-[#EBEBEB] rounded bg-white text-[#272727]  text-sm font-medium flex items-center gap-1"
                onClick={() => setShowFilterPopup(true)}
              >
                Filter
                <SvgIcons.TableFilter />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[#272727]  text-[14px]">
              <thead>
                <tr className="bg-[#F4F5F7] h-[34px] text-[#737373] text-[14px] font-[400]">
                  <th className="px-4 py-2 font-[400] text-left">Sl No</th>
                  <th className="px-4 py-2 font-[400] text-left">Payout ID</th>
                  <th className="px-4 py-2 font-[400] text-left">Beneficiary Name</th>
                  <th className="px-4 py-2 font-[400] text-left">Mode</th>
                  <th className="px-4 py-2 font-[400] text-left">Date & Time</th>
                  <th className="px-4 py-2 font-[400] text-left">Amount</th>
                  <th className="px-4 py-2 font-[400] text-left">Status</th>
                  <th className="px-4 py-2 font-[400] text-left">UPI</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.id} className="border-b border-b-[#F4F5F7]">
                      <td className="px-4 py-2 font-[500]">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 font-[500]">{item.payoutId}</td>
                      <td className="px-4 py-2 font-[500]">{item.beneficiaryName}</td>
                      <td className="px-4 py-2 font-[500]">{item.mode}</td>
                      <td className="px-4 py-2 font-[500]">{item.dateTime}</td>
                      <td className="px-4 py-2 font-[500]">{item.amount}</td>
                      <td className="px-4 py-2 font-[500]">
                        <span
                          className={`w-fit flex items-center gap-1 px-3 py-1 rounded text-[14px] font-medium ${
                            item.status === 'Success'
                              ? 'bg-[#D6FDE2] text-[#23B04E] border border-[#23B04E]'
                              : item.status === 'Failed'
                              ? 'bg-[#FEDBDB] text-[#EC2020] border border-[#EC2020]'
                              : 'bg-orange-100 text-orange-600 border border-orange-600'
                          }`}
                        >
                          {item.status === 'Success' ? (
                            <SvgIcons.TableSuccess />
                          ) : (
                            <SvgIcons.TableFail />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{item.upi}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-2 text-center">
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showFilterPopup && (
            <FilterPopup
              onClose={() => setShowFilterPopup(false)}
              onApply={handleApplyFilters}
            />
          )}
        </div>
      )}

      {!isLoading && !error && totalPages > 0 && (
        <div className="flex justify-end items-center gap-2 mt-4 text-[#272727] text-sm">
          <button
            className="bg-[#FFF] rounded-[8px] h-[36px] w-[36px] flex items-center justify-center disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <SvgIcons.PaginationLeftIcon />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`h-[36px] bg-white w-[36px] flex items-center justify-center rounded ${
                currentPage === page ? 'text-[#284292] border border-[#18970C]' : 'border'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="bg-[#FFF] rounded-[8px] h-[36px] w-[36px] flex items-center justify-center disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <SvgIcons.PaginationRightIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default InvoiceTable;

