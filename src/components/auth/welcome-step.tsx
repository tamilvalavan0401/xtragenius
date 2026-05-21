
import { AuthData } from "@/types/auth";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Bars, ThreeCircles } from "react-loader-spinner";
import TestimonialSection from "./testimonial-section";
import axiosInstance, { AK } from "@/api/axiosInstance";
import SvgIcons from "@/components/SvgIcons";

interface WelcomeStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: 'welcome' | 'verify' | 'personal' | 'password' | 'forgot-password' | 'login') => void;
}

export function WelcomeStep({ authData, updateAuthData, goToStep }: WelcomeStepProps) {
  const [email, setEmail] = useState(authData.email);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.trim()) {
    setError("Email is required");
    toast.error("Email is required", { duration: 4000 });
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    toast.error("Please enter a valid email address", { duration: 4000 });
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await axiosInstance.post(AK.ACCOUNTCHECK, { email });
    // console.log("response  ",response)
    if (response.status === 404) {
      // Account not found, proceed to registration

      const registerResponse = await axiosInstance.post(AK.REGISTER, {
        step: 1,
        email,
      });

      if (registerResponse.status === 200) {
        setError(null);
        updateAuthData({ email });
        goToStep("verify"); // Move to VerifyEmailStep for OTP verification
        toast.success("Registration started. Please verify your email.", {
          duration: 4000,
        });
      } else {
    console.log("response  ",response)

        throw new Error(
          (registerResponse.data as any)?.message || "Registration failed"
        );
      }
    
    } else if (response.status === 200) {
      // Account exists, redirect to login
      setError(null);
      updateAuthData({ email });
      goToStep("login"); // Move to LoginStep for password login
      toast.success("Account found. Please log in.", { duration: 4000 });
    } else {
    console.log("response  ",response)

      throw new Error(
        (response.data as any)?.message || "Error checking account"
      );
    }
  } catch (error: any) {
    // console.log("response  ",error)
    if (error.status === 404) {
      try{
      // Account not found, proceed to registration
      const registerResponse = await axiosInstance.post(AK.REGISTER, {
        step: 1,
        email,
      });
      if (registerResponse.status === 200) {
        setError(null);
        updateAuthData({ email });
        goToStep("verify"); // Move to VerifyEmailStep for OTP verification
        toast.success("Registration started. Please verify your email.", {
          duration: 4000,
        });
      } else {
 console.log("registerResponse  ",registerResponse)
        throw new Error(
          (registerResponse.data as any)?.message || "Registration failed"
        );
      }
      }
     catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to resend OTP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
    }
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    setError(errorMessage);
     if (error.status !== 404) {
    toast.error(errorMessage, { duration: 4000 });
     }
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
      {/* Left Side - Form */}
      <div className="bg-[#fff] rounded-xl h-full md:h-[90vh] max-h-screen md:max-h-[700px] p-[16px] md:p-10 flex flex-col gap-[20px] justify-between items-center relative">
        <div className="w-full max-w-sm">
          <div className="flex justify-center items-center gap-[15px] block md:hidden mb-[40px]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>
          <h2
            className="text-[#272727] text-[24px] md:text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-[24px]"
          >
            Welcome to your account
          </h2>

          <form className="space-y-[16px]">
            <div>
              <label
                htmlFor="email-input"
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
              >
                Business Email
              </label>
              <motion.div
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email here"
                  aria-describedby="email-help"
                  className={`flex h-10 px-3 py-2 items-center gap-1.5 w-full rounded-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124CBE] focus:border-transparent ${
                    error ? "border-red-500" : "border-[#868EA4]"
                  }`}
                />
                {error && (
                  <p
                    className="text-red-500 text-xs mt-1"
                  >
                    {error}
                  </p>
                )}
              </motion.div>
            </div>

              <button
                onClick={handleSubmit}
                type="button"
                className="flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors"
              >
               {loading ? (  <Bars
                 height="25"
                 width="200"
                 color="#fff"
                 ariaLabel="bars-loading"
                 wrapperStyle={{}}
                 wrapperClass=""
                 visible={true}
                 />) : ("Continue")}
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

      {/* Right Side - Testimonial */}
      <TestimonialSection />
    </>
  );
}

