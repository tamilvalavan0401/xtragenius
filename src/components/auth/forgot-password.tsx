

import { AuthData } from "@/types/auth";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import TestimonialSection from "./testimonial-section";
import axiosInstance, { AK } from "@/api/axiosInstance";
import { Bars } from "react-loader-spinner";

interface ForgotPasswordStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: "welcome" | "verify" | "personal" | "password" | "forgot-password" | "login" | "reset-password") => void;
  onBack: () => void;
}

export function ForgotPasswordStep({ authData, updateAuthData, goToStep, onBack }: ForgotPasswordStepProps) {
  const [otp, setOtp] = useState(authData.otp || "");
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false); // For OTP verification
  const [resendOtpLoading, setResendOtpLoading] = useState(false); // For resend OTP
  const [error, setError] = useState<string | null>(null);

  const validateOtp = (otp: string) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError("OTP is required");
      toast.error("OTP is required", { duration: 4000 });
      return;
    }
    if (!validateOtp(otp)) {
      setError("Please enter a valid 6-digit OTP");
      toast.error("Please enter a valid 6-digit OTP", { duration: 4000 });
      return;
    }

    setVerifyOtpLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.FORGOT_PASSWORD_VERIFY, {
        email: authData.email,
        otp,
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("response", response.data.data);
        const resetToken = response.data.data.reset_token; // Direct access to reset_token
        console.log("reset_token", resetToken);
        updateAuthData({ otp, reset_token: resetToken }); // Use the correct token value
        goToStep("reset-password"); // Move to reset password step
        toast.success("OTP verified successfully", { duration: 4000 });
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendOtpLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.FORGOT_PASSWORD_REQUEST_OTP, {
        email: authData.email,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("OTP resent successfully", { duration: 4000 });
      } else {
        throw new Error(response.data.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to resend OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setResendOtpLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg flex h-full p-[16px] md:p-10 flex-col justify-between items-center">
        <div className="w-full max-w-sm">
          <h1 className="mb-[40px] text-center block md:hidden">
            <span className="text-[#F93] text-center text-[24px] font-extrabold leading-[100%]">Pay</span>
            <span className="text-[#124CBE] text-center text-[24px] font-extrabold leading-[100%]">Qwick</span>
          </h1>
          <h2
            className="text-[#272727] text-[24px] md:text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-[12px]"
            
          >
            Reset password with OTP
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
                  id="otp-input"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter OTP"
                  className={`flex h-10 px-3 py-2 items-center gap-1.5 w-full rounded-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent ${error ? "border-red-500" : "border-[#868EA4]"
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
                disabled={resendOtpLoading}
                className={`text-[#124CBE] flex items-center justify-end w-full text-sm mt-6 text-end underline ${resendOtpLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                
              >
                {resendOtpLoading ? (
                  <Bars height="20" width="20" color="#124CBE" ariaLabel="bars-loading" visible={true} />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={verifyOtpLoading}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${verifyOtpLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              
            >
              {verifyOtpLoading ? (
                <Bars height="30" width="30" color="#fff" ariaLabel="bars-loading" visible={true} />
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
            By continuing you agree to our{" "}
            <span>
              <a href="" className="underline">privacy policy</a>{" "}
            </span>
            and{" "}
            <span>
              <a href="" className="underline">terms of use</a>
            </span>
          </p>
        </div>
      </div>

      <TestimonialSection />
    </>
  );
}

