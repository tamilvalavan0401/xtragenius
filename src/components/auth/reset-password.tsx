

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthData } from "@/types/auth";
import TestimonialSection from "./testimonial-section";
import { motion } from "framer-motion";
import { useUser } from "@/api/context/UserContext";
import { Bars } from "react-loader-spinner"; // Using Bars for consistency
import axiosInstance, { AK } from "@/api/axiosInstance";
import SvgIcons from "@/components/SvgIcons";

interface ResetPasswordStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: "welcome" | "verify" | "personal" | "password" | "forgot-password" | "login" | "dashboard" | "reset-password") => void;
}

export function ResetPasswordStep({ authData, updateAuthData, goToStep }: ResetPasswordStepProps) {
  const [password, setPassword] = useState(authData.password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useUser();

  const requirements = [
    { text: "Must be at least 8 characters", met: password.length >= 8 },
    { text: "Must include lowercase letter", met: /[a-z]/.test(password) },
    { text: "Must include uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Must include a number", met: /[0-9]/.test(password) },
    { text: "Must include special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      setServerErrors([]);
      toast.error("Password is required", { duration: 4000 });
      return;
    }
    if (!allRequirementsMet) {
      setError("Password does not meet all requirements");
      setServerErrors([]);
      toast.error("Password does not meet all requirements", { duration: 4000 });
      return;
    }

    setLoading(true);
    setError(null);
    setServerErrors([]);

    try {
const payload = {
  email: authData.email,
  password,
  reset_token: authData.reset_token, // Use the correct key from authData
};
      const response = await axiosInstance.post(AK.RESET_PASSWORD, payload);

      if (response.status >= 200 && response.status < 300) {
        // const { user, token } = response.data.data || {};
        updateAuthData({ password });
        // setUserData(user, token);
        goToStep("welcome");
        toast.success("Password reset successfully", { duration: 4000 });
      } else {
        throw new Error(response.data.message || "Failed to reset password");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
      const serverValidationErrors = error.response?.data?.errors?.password || [];
      setError(errorMessage);
      setServerErrors(serverValidationErrors);
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

  return (
    <>
      <div className="bg-white rounded-lg flex h-[680px] p-10 flex-col justify-between items-center">
        <div className="w-full max-w-sm">
          <h1
            className="text-[#272727] text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-8"
            
          >
            Reset Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
                
              >
                Password
              </label>
              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                    setServerErrors([]);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter password"
                  className={`flex h-10 px-3 py-2 pr-10 items-center gap-1.5 w-full rounded-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent ${
                    error ? "border-red-500" : "border-[#868EA4]"
                  }`}
                  
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#868EA4]"
                >
                  {showPassword ? <SvgIcons.PasswordHide/> : <SvgIcons.PasswordOpen/>}
                </button>
                {error && (
                  <p
                    className="text-red-500 text-xs mt-1"
                    
                  >
                    {error}
                  </p>
                )}
              </motion.div>
            </div>

            <div className="space-y-2">
              {serverErrors.length > 0 ? (
                serverErrors.map((err, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M11 0L4 8L1 5"
                        stroke="#FF0000"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-sm text-red-500"
                      
                    >
                      {err}
                    </span>
                  </div>
                ))
              ) : (
                requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path
                        d="M11 0L4 8L1 5"
                        stroke={req.met ? "#124CBE" : "#868EA4"}
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`text-sm ${req.met ? "text-[#124CBE]" : "text-[#868EA4]"}`}
                      
                    >
                      {req.text}
                    </span>
                  </div>
                ))
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !allRequirementsMet}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              
            >
              {loading ? (
                <Bars height="30" width="30" color="#fff" ariaLabel="bars-loading" visible={true} />
              ) : (
                "Reset Password"
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

