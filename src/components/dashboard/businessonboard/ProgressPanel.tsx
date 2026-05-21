import SvgIcons from "@/components/SvgIcons";
import { useUser } from "@/api/context/UserContext";
import { logout } from "@/api/service/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

// 0 = Personal Details, 2 = Business Details, 3 = Bank Details, 4 = KYC Details
interface ProgressPaneProps {
  screen: number;
  onBack: () => void;
}

export function ProgressPane({ screen, onBack }: ProgressPaneProps) {
  function progressPercent() {
    const map: Record<number, number> = {
      0: 33.33, // Personal Details
      2: 66.67, // Business Details
      3: 100,   // Bank Details
      4: 100,   // KYC Details
    };
    return map[screen] ?? 33.33; // Default to 33.33% for initial state
  }

  const [loading, setLoading] = useState(false);
  const { user, token, email, clearUserData } = useUser();
  const navigate = useNavigate();

  
    const handleLogout = async () => {
      if (!token) {
        // toast.error("No token found. Please log in again.", { duration: 4000 });
        navigate("/");
        return;
      }
  
      setLoading(true);
      try {
        const response = await logout(token);
        if (response.success) {
          clearUserData();
          toast.success(response.message, { duration: 4000 });
          navigate("/");
        } else {
          throw new Error(response.message || "Logout failed");
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Logout failed. Please try again.";
        toast.error(errorMessage, { duration: 4000 });
      } finally {
        setLoading(false);
      }
    };

  console.log("Current screen:", screen);
  // Marketing that runs without strategy

  return (
    <div className="hidden md:flex h-full md:h-[90vh] max-h-screen md:max-h-[700px] flex-col justify-between rounded-[8px] bg-[#E4ECFC] p-[40px]">
      <div className="space-y-6">
        <div className="flex justify-center items-center gap-[15px] block  mb-[40px]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-6">
            <div className="h-2 w-full rounded-full bg-[#E6EAEF]" aria-label="Progress bar">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#162456] to-[#124CBE] transition-all duration-300"
                style={{ width: `${progressPercent()}%` }}
              />
            </div>
          </div>

          <ol className="space-y-4 text-sm">
            <li
              className={`flex items-center h-8 gap-2 ${
                screen === 0 ? "bg-[#F5F5F5] rounded-[4px] px-2" : "px-2"
              }`}
            >
              {/* Personal Details is always completed by default */}
              <SvgIcons.SuccessSvg className="w-5 h-5 text-[#3970DD]" />
              <span
                className={`text-[#272727]  text-[14px] font-normal leading-[18px]`}
              >
                Personal Details
              </span>
            </li>
            <li
              className={`flex items-center h-8 gap-2 ${
                screen === 2 ? "bg-[#F5F5F5] rounded-[4px] px-2" : "px-2"
              }`}
            >
              {screen >= 2 ? (
                <SvgIcons.SuccessSvg className="w-5 h-5 text-[#3970DD]" />
              ) : (
                <span className="w-5 text-[#272727]  text-[14px] font-normal">2.</span>
              )}
              <span
                className={`text-[#272727]  text-[14px] font-normal leading-[18px] ${
                  screen < 2 ? "text-[#8F8F8F]" : ""
                }`}
              >
                Business Details
              </span>
            </li>
            <li
              className={`flex items-center h-8 gap-2 ${
                screen === 3 ? "bg-[#F5F5F5] rounded-[4px] px-2" : "px-2"
              }`}
            >
              {screen >= 3 ? (
                <SvgIcons.SuccessSvg className="w-5 h-5 text-[#3970DD]" />
              ) : (
                <span className="w-5 text-[#272727]  text-[14px] font-normal">3.</span>
              )}
              <span
                className={`text-[#272727]  text-[14px] font-normal leading-[18px] ${
                  screen < 3 ? "text-[#8F8F8F]" : ""
                }`}
              >
                Bank Details
              </span>
            </li>
            <li
              className={`flex items-center h-8 gap-2 ${
                screen === 4 ? "bg-[#F5F5F5] rounded-[4px] px-2" : "px-2"
              }`}
            >
              {screen >= 4 ? (
                <SvgIcons.SuccessSvg className="w-5 h-5 text-[#3970DD]" />
              ) : (
                <span className="w-5 text-[#272727]  text-[14px] font-normal">4.</span>
              )}
              <span
                className={`text-[#272727]  text-[14px] font-normal leading-[18px] ${
                  screen < 4 ? "text-[#8F8F8F]" : ""
                }`}
              >
                KYC Details
              </span>
            </li>
          </ol>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-center">
          <span className="text-[#7697D9] font-['Familjen Grotesk'] text-[28px] font-bold leading-[39.2px]">
            Let’s set up{" "}
          </span>
          <span className="text-[#3672E8] font-['Familjen Grotesk'] text-[28px] font-bold leading-[39.2px]">
            your business for{" "}
          </span>
          <span className="text-[#002E89] font-['Familjen Grotesk'] text-[28px] font-bold leading-[39.2px]">
            faster payments.
          </span>
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-[#272727]  text-[14px] font-normal leading-[18px] hover:text-[#124CBE] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M10.0312 15.625L4.40625 10L10.0312 4.375M5.1875 10H16.5938"
              stroke="#272727"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}

