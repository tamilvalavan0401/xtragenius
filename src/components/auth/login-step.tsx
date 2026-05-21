import { AuthData } from "@/types/auth";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import TestimonialSection from "./testimonial-section";
import { useUser } from "@/api/context/UserContext";
import { Bars } from "react-loader-spinner";
import axiosInstance, { AK } from "@/api/axiosInstance";
import SvgIcons from "@/components/SvgIcons";

interface LoginStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: "welcome" | "verify" | "personal" | "password" | "forgot-password" | "login") => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

export function LoginStep({ authData, updateAuthData, goToStep, onBack, onForgotPassword }: LoginStepProps) {
  const [password, setPassword] = useState(authData.password || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // For password login
  const [resendOtpLoading, setResendOtpLoading] = useState(false); // For Resend OTP and Forgot Password
  const [otpLoginLoading, setOtpLoginLoading] = useState(false); // For Login with OTP
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const navigate = useNavigate();
  const { setUserData } = useUser();


  const PasswordInputRef = useRef<HTMLInputElement>(null);
  
  
  useEffect(() => {
      if (PasswordInputRef.current) {
        PasswordInputRef.current.focus();
      }
    }, []);

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const validateOtp = (otp: string) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError, { duration: 4000 });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.LOGIN, {
        email: authData.email,
        password,
      });

      if (response.status >= 200 && response.status < 300) {
        setUserData(response.data.data.user, response.data.data.token, authData.email);
        updateAuthData({ password });
        toast.success(response.data.message || "Login successful", { duration: 4000 });
        navigate("/dashboard");
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordOtp = async () => {
    setResendOtpLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.FORGOT_PASSWORD_REQUEST_OTP, {
        email: authData.email,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("OTP sent successfully", { duration: 4000 });
        goToStep("forgot-password"); // Navigate to forgot-password step on success
      } else {
        throw new Error(response.data.message || "Failed to request OTP");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to request OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setResendOtpLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    setResendOtpLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.LOGIN_REQUEST_OTP, {
        email: authData.email,
      });

      if (response.status >= 200 && response.status < 300) {
        setIsOtpLogin(true);
        toast.success("OTP sent successfully", { duration: 4000 });
      } else {
        throw new Error(response.data.message || "Failed to request OTP");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to request OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setResendOtpLoading(false);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
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

    setOtpLoginLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(AK.LOGIN_VERIFY_OTP, {
        email: authData.email,
        otp,
      });

      if (response.status >= 200 && response.status < 300) {
        setUserData(response.data.data.user, response.data.data.token, authData.email);
        updateAuthData({ otp });
        toast.success(response.data.message || "Login successful", { duration: 4000 });
        navigate("/dashboard");
      } else {
        throw new Error(response.data.message || "OTP verification failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "OTP verification failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setOtpLoginLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isOtpLogin ? handleOtpLogin(e as any) : handlePasswordLogin(e as any);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg flex h-full p-[16px] md:p-10 flex-col justify-between items-center">
        <div className="w-full max-w-sm">
          <div className="flex justify-center items-center gap-[15px] block md:hidden mb-[40px]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>
          <h2
            className="text-[#272727] text-[24px] md:text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-[12px]"
            
          >
            Login to account
          </h2>

          <div className="mb-[24px]">
            <p
              className="text-[#272727] text-sm font-normal leading-[100%]"
              
            >
              {authData.email}
              <button
                type="button"
                onClick={onBack}
                className="text-[#124CBE] ml-2 underline hover:text-[#0E2655] transition-colors"
              >
                Change
              </button>
            </p>
          </div>

          <form className="space-y-[16px]">
            <div>
              <label
                htmlFor="login-input"
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
                
              >
                {isOtpLogin ? "Enter OTP" : "Password"}
              </label>
              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                  id="login-input"
                         ref={PasswordInputRef}
                  type={isOtpLogin ? "text" : "password"}
                  value={isOtpLogin ? otp : password}
                  onChange={(e) => {
                    if (isOtpLogin) {
                      setOtp(e.target.value);
                    } else {
                      setPassword(e.target.value);
                    }
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={isOtpLogin ? "Enter OTP" : "Enter password"}
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
              {isOtpLogin ? (
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={resendOtpLoading}
                  className={`flex whitespace-nowrap items-center justify-center w-[80px] h-6 text-[#124CBE] ml-auto text-sm mt-4 text-end underline ${
                    resendOtpLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  
                >
                  {resendOtpLoading ? (
                    <Bars
                      height="20"
                      width="20"
                      color="#124CBE"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    "Resend OTP"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleForgotPasswordOtp}
                  disabled={resendOtpLoading}
                  className={`text-[#124CBE] flex ml-auto items-center justify-end w-fit text-sm mt-4 text-end underline ${
                    resendOtpLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  
                >
                  {resendOtpLoading ? (
                    <Bars
                      height="20"
                      width="20"
                      color="#124CBE"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    "Forgot Password"
                  )}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={isOtpLogin ? handleOtpLogin : handlePasswordLogin}
              disabled={loading || (isOtpLogin && otpLoginLoading)}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${
                loading || (isOtpLogin && otpLoginLoading) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              
            >
              {loading || (isOtpLogin && otpLoginLoading) ? (
                <Bars
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : isOtpLogin ? (
                "Login with OTP"
              ) : (
                "Login"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                if (isOtpLogin) {
                  setIsOtpLogin(false);
                } else {
                  handleRequestOtp();
                }
              }}
              disabled={resendOtpLoading}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full border-[#124CBE] border text-[#124CBE] text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${
                resendOtpLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              
            >
              {resendOtpLoading ? (
                <Bars
                  height="30"
                  width="30"
                  color="#124CBE"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : isOtpLogin ? (
                "Switch to Password Login"
              ) : (
                "Login with OTP"
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p
            className="text-[#6E6E6E] text-sm font-normal leading-[150%]"
            
          >
            By continuing you agree to our{' '}
            <span>
              <a href="" className="underline">
                privacy policy
              </a>{' '}
              and{' '}
            </span>
            <span>
              <a href="" className="underline">
                terms of use
              </a>
            </span>
          </p>
        </div>
      </div>

      <TestimonialSection />
    </>
  );
}

