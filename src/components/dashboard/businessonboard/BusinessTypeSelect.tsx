// components/BusinessTypeSelect.tsx
import * as React from "react";
import { motion } from "framer-motion";

interface BusinessTypeSelectProps {
  businessType: string;
  lockedType: boolean;
  error: string | null;
  onChange: (value: string) => void;
}

export function BusinessTypeSelect({ businessType, lockedType, error, onChange }: BusinessTypeSelectProps) {
  const inputBase =
    "h-9 w-full rounded-md border bg-white px-3 text-sm text-[#272727] font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent";

  return (
    <div className="space-y-3">
      <div>
        <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
          Business Type
        </label>
        <motion.div
          animate={error === "Please select a business type." ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <select
            className={`${inputBase} ${error === "Please select a business type." ? "border-red-500" : "border-[#868EA4]"} disabled:bg-[#F5F7FA]`}
            value={businessType}
            disabled={lockedType}
            onChange={(e) => onChange(e.target.value)}
            
          >
            <option value="0">Select Type</option>
            <option value="1">Proprietorship</option>
            <option value="2">Partnership Firm</option>
            <option value="3">LLP (Limited Liability Partnership)</option>
            <option value="4">Private Limited Company</option>
          </select>
          {error === "Please select a business type." && (
            <p className="text-red-500 text-xs mt-1" >
              {error}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}


