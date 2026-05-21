

import { AuthData } from "@/types/auth";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import TestimonialSection from "./testimonial-section";
import axiosInstance, { AK } from "@/api/axiosInstance";
import SvgIcons from "@/components/SvgIcons";

interface VerifyEmailStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: 'welcome' | 'verify' | 'personal' | 'password' | 'forgot-password' | 'login') => void;
  onBack: () => void;
}

export function VerifyEmailStep({ authData, updateAuthData, goToStep, onBack }: VerifyEmailStepProps) {
  const [otp, setOtp] = useState(authData.otp || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
const otpInputRef = useRef<HTMLInputElement>(null);


useEffect(() => {
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  const validateOtp = (otp: string) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedOtp = otp.trim();
    if (!trimmedOtp) {
      setError("OTP is required");
      toast.error("OTP is required", { duration: 4000 });
      return;
    }
    if (!validateOtp(trimmedOtp)) {
      setError("Please enter a valid 6-digit OTP");
      toast.error("Please enter a valid 6-digit OTP", { duration: 4000 });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = { step: 2, email: authData.email, otp: Number(trimmedOtp) };
      console.log("Submitting payload:", payload);
      const response = await axiosInstance.post(AK.REGISTER, payload);
      console.log("Response status:", response.status);

      if (response.status >= 200 && response.status < 300) {
        setError(null);
        updateAuthData({ otp: trimmedOtp });
        goToStep("personal");
        toast.success("OTP verified successfully", { duration: 4000 });
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      console.error("OTP verification error:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.REGISTER, { step: 1, email: authData.email });

      if (response.status >= 200 && response.status < 300) {
        toast.success("OTP resent successfully", { duration: 4000 });
        // Reset timer
        setTimeLeft(120);
        setIsResendDisabled(true);
      } else {
        throw new Error(response.data.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to resend OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  // Format timeLeft as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <>
      <div className="bg-white rounded-lg flex h-full p-[16px] md:p-10 flex-col justify-between items-center">
        <div className="w-full max-w-sm">
          <div className="flex justify-center items-center gap-[15px] block md:hidden mb-[40px]]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>
          <h2
            className="text-[#272727] text-[24px] md:text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-[12px]"
            
          >
            Verify your email
          </h2>

          <div className="mb-[24px]">
            <p
              className="text-[#272727] text-sm font-normal leading-[100%]"
              
            >
              {authData.email}
              <button
                type="button"
                onClick={onBack}
                className="text-[#124cbe] ml-2 underline hover:text-[#0e2655] transition-colors"
              >
                Change
              </button>
            </p>
          </div>

          <form className="space-y-[16px]">
            <div>
              <label
                htmlFor="otp-input"
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
                
              >
                Enter OTP
              </label>
              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                ref={otpInputRef}
                  id="otp-input"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter OTP"
                  className={`flex h-10 px-3 py-2 items-center gap-1.5 w-full rounded-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent ${
                    error ? "border-red-500" : "border-[#868EA4]"
                  }`}
                  
                  required
                />
                {error && (
                  <p
                    className="text-red-500 text-xs mt-1 absolute"
                    
                  >
                    {error}
                  </p>
                )}
              </motion.div>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading || isResendDisabled}
                className={`text-[#124CBE] flex items-center justify-end w-fit ml-auto text-sm mt-4 text-end underline ${
                  loading || isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                
              >
                {isResendDisabled ? `Resend OTP (${formatTime(timeLeft)})` : "Resend OTP"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              
            >
              {loading ? (
                <Bars
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Verify to Continue"
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p
            className="text-[#6E6E6E] text-sm font-normal leading-[150%]"
            
          >
            By continuing you agree to our <span><a href="" className="underline">privacy policy</a> and </span>{" "}
            <span><a href="" className="underline">terms of use</a></span>
          </p>
        </div>
      </div>

      <TestimonialSection />
    </>
  );
}

