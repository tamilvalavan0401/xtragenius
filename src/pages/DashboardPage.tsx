import { useState, useEffect, useCallback } from "react";
import StatsCards from "@/components/dashboard/stats-cards";
import TransactionsChart from "@/components/dashboard/transactions-chart";
import BalanceCard from "@/components/dashboard/balance-card";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import axiosInstance, { AK } from "@/api/axiosInstance";
import { OnboardingEntry } from "@/components/dashboard/businessonboard/onboarding-entry";

export default function DashboardPage() {
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchKycStatus = useCallback(async () => {
    try {
      const response = await axiosInstance.post(AK.KYC_FETCH);
      const { success, data } = response.data;
      if (success) {
        setKycStatus(data.kyc ? data.kyc.status : null);
      }
    } catch (error) {
      console.error("Error fetching KYC status:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKycStatus();
  }, [fetchKycStatus]);

  return (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TransactionsChart />
        </div>
        <div>
          <BalanceCard />
        </div>
      </div>
      <RecentTransactions />
      {!isLoading && (kycStatus === "pending" || kycStatus === null) && (
        <OnboardingEntry onSuccess={fetchKycStatus} />
      )}
    </>
  );
}

