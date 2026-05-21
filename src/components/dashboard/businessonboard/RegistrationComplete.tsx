// components/RegistrationComplete.tsx
import * as React from "react";
import { motion, Variants } from "framer-motion";

interface RegistrationCompleteProps {
  onClose: () => void;
}

// Explicitly type containerVariants as Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // Ensure ease is a string or array that Framer Motion accepts
    },
  },
};

export function RegistrationComplete({ onClose }: RegistrationCompleteProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-lg max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Success Icon */}
      <div className="mb-4">
        <svg
          className="w-16 h-16 text-[#124CBE]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h3
        className="text-[#124CBE] font-['Familjen Grotesk'] text-[28px] font-bold leading-[28px] mb-4"
        
      >
        Registration Completed!
      </h3>

      {/* Description */}
      <p
        className="text-[#6E6E6E]  text-[16px] font-normal leading-[24px] mb-6"
        
      >
        Your business onboarding is complete. You can now proceed with your activities.
      </p>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="h-10 px-6 rounded-lg text-white text-base font-medium bg-[#124CBE] hover:bg-[#002f8b] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#124CBE] focus:ring-opacity-50"
        
      >
        Close
      </button>
    </motion.div>
  );
}

