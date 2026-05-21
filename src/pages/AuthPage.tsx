import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeStep } from "@/components/auth/welcome-step";
import { VerifyEmailStep } from "@/components/auth/verify-email-step";
import { PersonalDetailsStep } from "@/components/auth/personal-details-step";
import { CreatePasswordStep } from "@/components/auth/create-password-step";
import { ForgotPasswordStep } from "@/components/auth/forgot-password";
import { LoginStep } from "@/components/auth/login-step";
import { ResetPasswordStep } from "@/components/auth/reset-password";
import { AuthStep, AuthData } from "@/types/auth";

export default function AuthPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("welcome");
  const [authData, setAuthData] = useState<AuthData>({
    email: "",
    otp: "",
    fullName: "",
    mobileNumber: "",
    password: "",
    reset_token: "",
    country_id: 0,
  });
  const navigate = useNavigate();

  const updateAuthData = (data: Partial<AuthData>) =>
    setAuthData((prev) => ({ ...prev, ...data }));
  const goToStep = (step: AuthStep) => setCurrentStep(step);
  const goBack = () => {
    switch (currentStep) {
      case "verify":
        setCurrentStep("welcome");
        break;
      case "personal":
        setCurrentStep("verify");
        break;
      case "password":
        setCurrentStep("personal");
        break;
      case "forgot-password":
        setCurrentStep("login");
        break;
      case "login":
        setCurrentStep("welcome");
        break;
      case "reset-password":
        setCurrentStep("forgot-password");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="h-screen flex items-start md:items-center justify-center"
      style={{ backgroundColor: "#EFF1F6" }}
    >
      <div className="w-full max-w-6xl h-full md:h-[90vh] flex items-start md:items-center justify-center rounded-lg overflow-hidden">
        {currentStep === "welcome" && (
          <WelcomeStep authData={authData} updateAuthData={updateAuthData} goToStep={goToStep} />
        )}
        {currentStep === "verify" && (
          <VerifyEmailStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={goToStep}
            onBack={goBack}
          />
        )}
        {currentStep === "personal" && (
          <PersonalDetailsStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={goToStep}
          />
        )}
        {currentStep === "password" && (
          <CreatePasswordStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={() => navigate("/dashboard")}
          />
        )}
        {currentStep === "forgot-password" && (
          <ForgotPasswordStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={goToStep}
            onBack={goBack}
          />
        )}
        {currentStep === "reset-password" && (
          <ResetPasswordStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={goToStep}
          />
        )}
        {currentStep === "login" && (
          <LoginStep
            authData={authData}
            updateAuthData={updateAuthData}
            goToStep={goToStep}
            onBack={goBack}
            onForgotPassword={() => goToStep("forgot-password")}
          />
        )}
      </div>
    </div>
  );
}

