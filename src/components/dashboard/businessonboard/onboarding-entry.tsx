"use client";

import * as React from "react";
import { BusinessOnboardingModal } from "./business-onboarding-modal";

interface OnboardingEntryProps {
  onSuccess?: () => void; // Callback to refetch KYC status
}

export function OnboardingEntry({ onSuccess }: OnboardingEntryProps) {
  const [open, setOpen] = React.useState(true); // Open modal by default when rendered

  return (
    <>
      <div className="fixed right-4 bottom-4 z-40">
        <button
          onClick={() => setOpen(true)}
          className="h-10 rounded-md px-4 bg-[#22A31A] text-white text-sm font-medium shadow hover:bg-[#002f8b] transition"
        >
          s
        </button>
      </div>
      <BusinessOnboardingModal
        open={open}
        onClose={() => {
          setOpen(false);
          onSuccess?.(); // Trigger refetch on close
        }}
      />
    </>
  );
}

