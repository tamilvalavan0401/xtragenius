"use client";

import * as React from "react";
import axiosInstance, { AK } from "@/api/axiosInstance";
import { Bars, ThreeCircles } from "react-loader-spinner";
import { BusinessTypeSelect } from "./BusinessTypeSelect";
import { BankFields } from "./BankFields";
import { KycDetails } from "./KycDetails";
import { RegistrationComplete } from "./RegistrationComplete";
import { ProgressPane } from "./ProgressPanel";
import { DynamicBusinessFields } from "./DynamicBusinessFields";
import SvgIcons from "@/components/SvgIcons";

type BusinessType = 0 | 1 | 2 | 3 | 4;
type Step = 1 | 2 | 3 | 4;

interface BusinessOnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export function BusinessOnboardingModal({ open, onClose }: BusinessOnboardingModalProps) {
  const [step, setStep] = React.useState<Step>(1);
  const [screen, setScreen] = React.useState<number>(0);
  const [businessType, setBusinessType] = React.useState<BusinessType>(0);
  const [lockedType, setLockedType] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showConfirmPopup, setShowConfirmPopup] = React.useState(false);


  const [businessTextDetails, setBusinessTextDetails] = React.useState<Record<string, string>>({
    proprietor_pan: "",
    name: "",
    business_pan: "",
    cin_no: "",
    tan_no: "",
    gst_no: "",
    proprietor_pan_file_password: "",
    business_pan_file_password: "",
    cin_file_password: "",
    llp_agreement_file_password: "",
    partnership_deed_file_password: "",
    moa_file_password: "",
    aoa_file_password: "",
    gst_file_password: "",
  });
  const [businessFileDetails, setBusinessFileDetails] = React.useState<Record<string, File | null>>({
    proprietor_pan_file: null,
    business_pan_file: null,
    cin_file: null,
    llp_agreement_file: null,
    partnership_deed_file: null,
    moa_file: null,
    aoa_file: null,
    gst_file: null,
  });
  const [bank, setBank] = React.useState({ ac_no: "", ac_ifsc: "", ac_cheque_file: null as File | null });
  const [aadhaar, setAadhaar] = React.useState({ aadhar_no: "", aadhaarFile: null as File | null });
  const [partnerDetails, setPartnerDetails] = React.useState<
    { name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null; dinNo?: string; dinFile?: File | null }[]
  >([]);
  const [directorDetails, setDirectorDetails] = React.useState<
    { dinNo: string; dinFile: File | null; name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({
    proprietor_pan: [],
    business_pan: [],
    cin_no: [],
    gst_no: [],
    tan_no: [],
    proprietor_pan_file: [],
    business_pan_file: [],
    cin_file: [],
    llp_agreement_file: [],
    partnership_deed_file: [],
    moa_file: [],
    aoa_file: [],
    gst_file: [],
    ac_no: [],
    ac_ifsc: [],
    ac_cheque_file: [],
    aadhar_no: [],
    aadhaarFile: [],
    partner_name: [],
    partner_pan: [],
    partner_aadhaar: [],
    partner_pan_file: [],
    partner_aadhaar_file: [],
    partner_din_no: [],
    partner_din_file: [],
    director_name: [],
    director_pan: [],
    director_aadhaar: [],
    director_pan_file: [],
    director_aadhaar_file: [],
    director_din_no: [],
    director_din_file: [],
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const businessTypeMap: Record<BusinessType, { apiValue: string; screen: number }> = {
    0: { apiValue: "0", screen: 1 },
    1: { apiValue: "1", screen: 2 },
    2: { apiValue: "2", screen: 2 },
    3: { apiValue: "3", screen: 2 },
    4: { apiValue: "4", screen: 2 },
  };

  const reverseBusinessTypeMap: Record<string, BusinessType> = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
  };

  const businessTypeLabels: Record<BusinessType, string> = {
    0: "",
    1: "Proprietorship",
    2: "Partnership Firm",
    3: "LLP (Limited Liability Partnership)",
    4: "Private Limited Company",
  };

  const fetchKycData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(AK.KYC_FETCH);
      const { success, data } = response.data;
      if (success && data.kyc) {
        const { screen, step: fetchedStep, business_type, cin_no_details, partner_details, director_details } = data.kyc;
        const selectedType = reverseBusinessTypeMap[business_type] ?? 0;
        setBusinessType(selectedType);
        setLockedType(!!business_type && business_type !== "0");
        setStep(fetchedStep || 1);
        setScreen(screen || 0);
        setBusinessTextDetails({
          proprietor_pan: data.kyc.proprietor_pan || "",
          name: data.kyc.name || "",
          business_pan: data.kyc.business_pan || "",
          cin_no: data.kyc.cin_no || "",
          tan_no: data.kyc.tan_no || "",
          gst_no: data.kyc.gst_no || "",
          proprietor_pan_file_password: data.kyc.proprietor_pan_file_password || "",
          business_pan_file_password: data.kyc.business_pan_file_password || "",
          cin_file_password: data.kyc.cin_file_password || "",
          llp_agreement_file_password: data.kyc.llp_agreement_file_password || "",
          partnership_deed_file_password: data.kyc.partnership_deed_file_password || "",
          moa_file_password: data.kyc.moa_file_password || "",
          aoa_file_password: data.kyc.aoa_file_password || "",
          gst_file_password: data.kyc.gst_file_password || "",
        });
        setBusinessFileDetails({
          proprietor_pan_file: null,
          business_pan_file: null,
          cin_file: null,
          llp_agreement_file: null,
          partnership_deed_file: null,
          moa_file: null,
          aoa_file: null,
          gst_file: null,
        });
        setBank({
          ac_no: data.kyc.ac_no || "",
          ac_ifsc: data.kyc.ac_ifsc || "",
          ac_cheque_file: null,
        });
        setAadhaar({
          aadhar_no: data.kyc.aadhar_no || "",
          aadhaarFile: null,
        });

        // Reset partner and director details to avoid cross-contamination
        setPartnerDetails([]);
        setDirectorDetails([]);

        // Populate partner details for business types 2 and 3
        if (selectedType === 2 || selectedType === 3) {
          const fetchedPartnerDetails = (partner_details || []).map((p: any) => ({
            name: p.name || "",
            pan: p.pan || "",
            panFile: null,
            pan_file: p.pan_file || null,
            aadhaar: p.aadhar || "",
            aadhaarFile: null,
            aadhaar_file: p.aadhar_file || null,
            dinNo: p.din || "",
            dinFile: null,
            din_file: p.din_file || null,
          }));
          setPartnerDetails(fetchedPartnerDetails);
        }

        // Populate director details for business type 4
        if (selectedType === 4) {
          const completedDirectors = (director_details || []).map((d: any) => ({
            dinNo: d.din || "",
            dinFile: null,
            din_file: d.din_file || null,
            name: d.name || "",
            pan: d.pan || "",
            panFile: null,
            pan_file: d.pan_file || null,
            aadhaar: d.aadhar || "",
            aadhaarFile: null,
            aadhaar_file: d.aadhar_file || null,
          }));

          const allDirectors = (cin_no_details?.directors || []).map((d: any) => ({
            dinNo: d.din_number || d.din_no || "",
            dinFile: null,
            din_file: null,
            name: d.director_name || d.name || "",
            pan: "",
            panFile: null,
            pan_file: null,
            aadhaar: "",
            aadhaarFile: null,
            aadhaar_file: null,
          }));

          // Merge completed and incomplete directors, prioritizing completed ones
          const mergedDirectors = allDirectors.map((director: any) => {
            const completed = completedDirectors.find((cd: any) => cd.dinNo === director.dinNo);
            return completed || director;
          });

          setDirectorDetails(mergedDirectors);

          // Set currentIndex to the first incomplete director
          const firstIncompleteIndex = mergedDirectors.findIndex(
            (director: any) => !completedDirectors.some((cd: any) => cd.dinNo === director.dinNo)
          );
          setCurrentIndex(firstIncompleteIndex >= 0 ? firstIncompleteIndex : 0);
        }

        // Check completion status and set showConfirmPopup
        if (screen === 3 && (selectedType === 4)) {
          // console.log("director_details",director_details,cin_no_details)
          if (director_details?.length === cin_no_details?.directors?.length) {
            setShowConfirmPopup(true);
          }
          else {
            setShowConfirmPopup(false);
          }
        }
        if(screen === 4){
            setIsComplete(true);
        }

        if (data.kyc.step === 4 && data.kyc.status === "verified") {
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
      } else {
        resetState();
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      setError("Failed to load KYC data. Please try again.");
      resetState();
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchKycData();
    } else {
      resetState();
    }
  }, [open]);

  const resetState = () => {
    setStep(1);
    setScreen(0);
    setBusinessType(0);
    setLockedType(false);
    setBusinessTextDetails({
      proprietor_pan: "",
      name: "",
      business_pan: "",
      cin_no: "",
      tan_no: "",
      gst_no: "",
      proprietor_pan_file_password: "",
      business_pan_file_password: "",
      cin_file_password: "",
      llp_agreement_file_password: "",
      partnership_deed_file_password: "",
      moa_file_password: "",
      aoa_file_password: "",
      gst_file_password: "",
    });
    setBusinessFileDetails({
      proprietor_pan_file: null,
      business_pan_file: null,
      cin_file: null,
      llp_agreement_file: null,
      partnership_deed_file: null,
      moa_file: null,
      aoa_file: null,
      gst_file: null,
    });
    setBank({ ac_no: "", ac_ifsc: "", ac_cheque_file: null });
    setAadhaar({ aadhar_no: "", aadhaarFile: null });
    setPartnerDetails([]);
    setDirectorDetails([]);
    setError(null);
    setFieldErrors({
      proprietor_pan: [],
      business_pan: [],
      cin_no: [],
      gst_no: [],
      tan_no: [],
      proprietor_pan_file: [],
      business_pan_file: [],
      cin_file: [],
      llp_agreement_file: [],
      partnership_deed_file: [],
      moa_file: [],
      aoa_file: [],
      gst_file: [],
      ac_no: [],
      ac_ifsc: [],
      ac_cheque_file: [],
      aadhar_no: [],
      aadhaarFile: [],
      partner_name: [],
      partner_pan: [],
      partner_aadhaar: [],
      partner_pan_file: [],
      partner_aadhaar_file: [],
      partner_din_no: [],
      partner_din_file: [],
      director_name: [],
      director_pan: [],
      director_aadhaar: [],
      director_pan_file: [],
      director_aadhaar_file: [],
      director_din_no: [],
      director_din_file: [],
    });
    setIsComplete(false);
    setCurrentIndex(0);
    setShowConfirmPopup(false);
  };

  function getRequiredFieldsForType(type: BusinessType, currentStep: Step, currentScreen: number): string[] {
    if (currentScreen === 0) {
      return ["business_type"];
    }
    if (currentScreen === 1) {
      if (type === 1) {
        if (currentStep === 1) return ["proprietor_pan"];
        if (currentStep === 2) return ["proprietor_pan_file"];
        if (currentStep === 3) return ["gst_no"];
        if (currentStep === 4) return ["gst_file"];
      } else if (type === 2) {
        if (currentStep === 1) return ["business_pan"];
        if (currentStep === 2) return ["business_pan_file", "partnership_deed_file"];
        if (currentStep === 3) return ["gst_no"];
        if (currentStep === 4) return ["gst_file"];
      } else if (type === 3) {
        if (currentStep === 1) return ["cin_no", "business_pan"];
        if (currentStep === 2) return ["cin_file", "business_pan_file", "llp_agreement_file"];
        if (currentStep === 3) return ["gst_no"];
        if (currentStep === 4) return ["gst_file"];
      } else if (type === 4) {
        if (currentStep === 1) return ["cin_no", "business_pan"];
        if (currentStep === 2) return ["cin_file", "business_pan_file", "moa_file", "aoa_file"];
        if (currentStep === 3) return ["gst_no"];
        if (currentStep === 4) return ["gst_file"];
      }
    }
    if (currentScreen === 2) {
      if (currentStep === 1) return ["ac_no", "ac_ifsc"];
      if (currentStep === 2) return ["ac_cheque_file"];
    }
    if (currentScreen === 3) {
      if (type === 1) {
        if (currentStep === 1) return ["aadhar_no"];
        if (currentStep === 2) return ["aadhaarFile"];
      } else if (type === 2) {
        return ["partner_name", "partner_pan", "partner_pan_file", "partner_aadhaar", "partner_aadhaar_file"];
      } else if (type === 3) {
        return [
          "partner_din_no",
          "partner_din_file",
          "partner_name",
          "partner_pan",
          "partner_pan_file",
          "partner_aadhaar",
          "partner_aadhaar_file",
        ];
      } else if (type === 4) {
        return [
          "director_din_no",
          "director_din_file",
          "director_name",
          "director_pan",
          "director_pan_file",
          "director_aadhaar",
          "director_aadhaar_file",
        ];
      }
    }
    return [];
  }

  React.useEffect(() => {
    if (open && screen === 3) {
      if ((businessType === 2 || businessType === 3) && partnerDetails?.length === 0) {
        setPartnerDetails([
          { name: "", pan: "", panFile: null, aadhaar: "", aadhaarFile: null, dinNo: "", dinFile: null },
        ]);
      } else if (businessType === 4 && directorDetails?.length === 0) {
        setDirectorDetails([
          { dinNo: "", dinFile: null, name: "", pan: "", panFile: null, aadhaar: "", aadhaarFile: null },
        ]);
      }
    }
  }, [open, screen, businessType, partnerDetails?.length, directorDetails?.length]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function validateStep(): string | null {
    // console.log("Validating step:", { step, screen, businessType, businessTextDetails, businessFileDetails, bank, partnerDetails, directorDetails });
    if (step === 1 && screen === 1 && businessType === 0) {
      return "Please select a business type.";
    }
    const required = getRequiredFieldsForType(businessType, step, screen);
    console.log("Required fields:", required);
    const newFieldErrors: Record<string, string[]> = { ...fieldErrors };
    let hasError = false;

    for (const k of required) {
      if (k === "ac_no") {
        if (!bank.ac_no?.trim()) {
          newFieldErrors[k] = ["The account number field is required."];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else if (k === "ac_ifsc") {
        if (!bank.ac_ifsc?.trim()) {
          newFieldErrors[k] = ["The IFSC field is required."];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else if (k === "ac_cheque_file") {
        if (!bank.ac_cheque_file) {
          newFieldErrors[k] = ["The cheque file field is required."];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else if (k.endsWith("_file") || k === "aadhaarFile") {
        const isPartnerDoc =
          (businessType === 2 || businessType === 3) &&
          partnerDetails.some(
            (p) => p[k.replace("partner_", "").replace("_file", "File") as keyof typeof p] instanceof File || p[k.replace("partner_", "").replace("_file", "File") as keyof typeof p] !== null
          );
        const isDirectorDoc =
          businessType === 4 &&
          directorDetails.some(
            (d) => d[k.replace("director_", "").replace("_file", "File") as keyof typeof d] instanceof File || d[k.replace("director_", "").replace("_file", "File") as keyof typeof d] !== null
          );
        if (!businessFileDetails[k] && !bank.ac_cheque_file && !aadhaar.aadhaarFile && !isPartnerDoc && !isDirectorDoc) {
          newFieldErrors[k] = [`The ${k.replace(/_/g, " ")} field is required.`];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else if (k === "partner_name" || k === "partner_pan" || k === "partner_aadhaar" || k === "partner_din_no") {
        if (businessType === 2 || businessType === 3) {
          const field = k.replace("partner_", "") as keyof typeof partnerDetails[number];
          if (partnerDetails?.length === 0 || partnerDetails.some((p) => typeof p[field] === "string" && !p[field]?.trim())) {
            newFieldErrors[k] = [`The ${k.replace(/_/g, " ")} field is required.`];
            hasError = true;
          } else {
            newFieldErrors[k] = [];
          }
        }
      } else if (k === "director_name" || k === "director_pan" || k === "director_aadhaar" || k === "director_din_no") {
        if (businessType === 4) {
          const field = k.replace("director_", "") as keyof typeof directorDetails[number];
          if (directorDetails?.length === 0 || directorDetails.some((d) => typeof d[field] === "string" && !d[field]?.trim())) {
            newFieldErrors[k] = [`The ${k.replace(/_/g, " ")} field is required.`];
            hasError = true;
          } else {
            newFieldErrors[k] = [];
          }
        }
      } else if (k === "aadhar_no") {
        if (!aadhaar.aadhar_no?.trim()) {
          newFieldErrors[k] = ["The Aadhaar number field is required."];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else if (k === "business_type") {
        if (businessType === 0) {
          newFieldErrors[k] = ["The business type field is required."];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      } else {
        if (!businessTextDetails[k]?.trim()) {
          newFieldErrors[k] = [`The ${k.replace(/_/g, " ")} field is required.`];
          hasError = true;
        } else {
          newFieldErrors[k] = [];
        }
      }
    }

    setFieldErrors(newFieldErrors);
    console.log("Field errors:", newFieldErrors);
    return hasError ? "Please fill all required fields." : null;
  }

  const kycDetailsRef = React.createRef<{ handleContinue: () => Promise<boolean> }>();

async function submitStepData(formData?: FormData, subStep?: number, confirm: boolean = false) {
  const data = formData || new FormData();
  setError(null);
  setIsSubmitting(true);

  try {
    data.append("business_type", businessTypeMap[businessType].apiValue);
    if (screen === 0) {
      data.append("business_type", businessTypeMap[businessType].apiValue);
    } else if (screen === 1) {
      data.append("sub_step", (subStep || step).toString());
      if (businessType === 1) {
        if ((subStep || step) === 1) {
          data.append("proprietor_pan", businessTextDetails["proprietor_pan"]?.trim() || "");
        } else if ((subStep || step) === 2) {
          if (businessFileDetails["proprietor_pan_file"]) {
            data.append("proprietor_pan_file", businessFileDetails["proprietor_pan_file"]!);
            data.append("proprietor_pan_file_password", businessTextDetails["proprietor_pan_file_password"] || "");
          }
          data.append("tan_no", businessTextDetails["tan_no"]?.trim() || "");
        } else if ((subStep || step) === 3) {
          data.append("gst_no", businessTextDetails["gst_no"]?.trim() || "");
        } else if ((subStep || step) === 4) {
          if (businessFileDetails["gst_file"]) {
            data.append("gst_file", businessFileDetails["gst_file"]!);
            data.append("gst_file_password", businessTextDetails["gst_file_password"] || "");
          }
        }
      } else if (businessType === 2) {
        if ((subStep || step) === 1) {
          data.append("business_pan", businessTextDetails["business_pan"]?.trim() || "");
        } else if ((subStep || step) === 2) {
          if (businessFileDetails["business_pan_file"]) {
            data.append("business_pan_file", businessFileDetails["business_pan_file"]!);
            data.append("business_pan_file_password", businessTextDetails["business_pan_file_password"] || "");
          }
          if (businessFileDetails["partnership_deed_file"]) {
            data.append("partnership_deed_file", businessFileDetails["partnership_deed_file"]!);
            data.append("partnership_deed_file_password", businessTextDetails["partnership_deed_file_password"] || "");
          }
          data.append("tan_no", businessTextDetails["tan_no"]?.trim() || "");
        } else if ((subStep || step) === 3) {
          data.append("gst_no", businessTextDetails["gst_no"]?.trim() || "");
        } else if ((subStep || step) === 4) {
          if (businessFileDetails["gst_file"]) {
            data.append("gst_file", businessFileDetails["gst_file"]!);
            data.append("gst_file_password", businessTextDetails["gst_file_password"] || "");
          }
        }
      } else if (businessType === 3) {
        if ((subStep || step) === 1) {
          data.append("cin_no", businessTextDetails["cin_no"]?.trim() || "");
          data.append("business_pan", businessTextDetails["business_pan"]?.trim() || "");
        } else if ((subStep || step) === 2) {
          if (businessFileDetails["cin_file"]) {
            data.append("cin_file", businessFileDetails["cin_file"]!);
            data.append("cin_file_password", businessTextDetails["cin_file_password"] || "");
          }
          if (businessFileDetails["business_pan_file"]) {
            data.append("business_pan_file", businessFileDetails["business_pan_file"]!);
            data.append("business_pan_file_password", businessTextDetails["business_pan_file_password"] || "");
          }
          if (businessFileDetails["llp_agreement_file"]) {
            data.append("llp_agreement_file", businessFileDetails["llp_agreement_file"]!);
            data.append("llp_agreement_file_password", businessTextDetails["llp_agreement_file_password"] || "");
          }
          data.append("tan_no", businessTextDetails["tan_no"]?.trim() || "");
        } else if ((subStep || step) === 3) {
          data.append("gst_no", businessTextDetails["gst_no"]?.trim() || "");
        } else if ((subStep || step) === 4) {
          if (businessFileDetails["gst_file"]) {
            data.append("gst_file", businessFileDetails["gst_file"]!);
            data.append("gst_file_password", businessTextDetails["gst_file_password"] || "");
          }
        }
      } else if (businessType === 4) {
        if ((subStep || step) === 1) {
          data.append("cin_no", businessTextDetails["cin_no"]?.trim() || "");
          data.append("business_pan", businessTextDetails["business_pan"]?.trim() || "");
        } else if ((subStep || step) === 2) {
          if (businessFileDetails["cin_file"]) {
            data.append("cin_file", businessFileDetails["cin_file"]!);
            data.append("cin_file_password", businessTextDetails["cin_file_password"] || "");
          }
          if (businessFileDetails["business_pan_file"]) {
            data.append("business_pan_file", businessFileDetails["business_pan_file"]!);
            data.append("business_pan_file_password", businessTextDetails["business_pan_file_password"] || "");
          }
          if (businessFileDetails["moa_file"]) {
            data.append("moa_file", businessFileDetails["moa_file"]!);
            data.append("moa_file_password", businessTextDetails["moa_file_password"] || "");
          }
          if (businessFileDetails["aoa_file"]) {
            data.append("aoa_file", businessFileDetails["aoa_file"]!);
            data.append("aoa_file_password", businessTextDetails["aoa_file_password"] || "");
          }
          data.append("tan_no", businessTextDetails["tan_no"]?.trim() || "");
        } else if ((subStep || step) === 3) {
          data.append("gst_no", businessTextDetails["gst_no"]?.trim() || "");
        } else if ((subStep || step) === 4) {
          if (businessFileDetails["gst_file"]) {
            data.append("gst_file", businessFileDetails["gst_file"]!);
            data.append("gst_file_password", businessTextDetails["gst_file_password"] || "");
          }
        }
      }
    } else if (screen === 2) {
      if (step === 1) {
        data.append("ac_no", bank.ac_no.trim());
        data.append("ac_ifsc", bank.ac_ifsc.trim());
      } else if (step === 2) {
        if (bank.ac_cheque_file) {
          data.append("ac_cheque_file", bank.ac_cheque_file);
        }
      }
    } else if (screen === 3) {
      if (businessType === 1) {
        if (step === 1) {
          data.append("aadhar_no", aadhaar.aadhar_no.trim());
        } else if (step === 2) {
          if (aadhaar.aadhaarFile) {
            data.append("aadhar_file", aadhaar.aadhaarFile);
            data.append("aadhar_file_password", businessTextDetails["aadhaarFile_password"] || "");
          }
        }
      } else if (businessType === 2 || businessType === 3) {
        const partner = partnerDetails[currentIndex];
        if (partner) {
          data.append(`name`, partner.name || "");
          data.append(`pan`, partner.pan || "");
          if (partner.panFile) {
            data.append(`pan_file`, partner.panFile);
            data.append(`pan_file_password`, businessTextDetails[`partner_${currentIndex}_pan_file_password`] || "");
          }
          data.append(`aadhar`, partner.aadhaar || "");
          if (partner.aadhaarFile) {
            data.append(`aadhar_file`, partner.aadhaarFile);
            data.append(`aadhar_file_password`, businessTextDetails[`partner_${currentIndex}_aadhaar_file_password`] || "");
          }
          if (businessType === 3 && partner.dinNo) {
            data.append(`din`, partner.dinNo || "");
            if (partner.dinFile) {
              data.append(`din_file`, partner.dinFile);
              data.append(`din_file_password`, businessTextDetails[`partner_${currentIndex}_din_file_password`] || "");
            }
          }
          if (confirm && currentIndex === partnerDetails?.length - 1) {
            data.append("confirm", "true");
          }
        }
      } else if (businessType === 4) {
        const director = directorDetails[currentIndex];
        if (director) {
          data.append(`din`, director.dinNo || "");
          if (director.dinFile) {
            data.append(`din_file`, director.dinFile);
            data.append(`din_file_password`, businessTextDetails[`director_${currentIndex}_din_file_password`] || "");
          }
          data.append(`name`, director.name || "");
          data.append(`pan`, director.pan || "");
          if (director.panFile) {
            data.append(`pan_file`, director.panFile);
            data.append(`pan_file_password`, businessTextDetails[`director_${currentIndex}_pan_file_password`] || "");
          }
          data.append(`aadhar`, director.aadhaar || "");
          if (director.aadhaarFile) {
            data.append(`aadhar_file`, director.aadhaarFile);
            data.append(`aadhar_file_password`, businessTextDetails[`director_${currentIndex}_aadhaar_file_password`] || "");
          }
          if (confirm && currentIndex === directorDetails?.length - 1) {
            data.append("confirm", "true");
          }
        }
      }
    }

    // console.log("Submitting FormData for sub_step", subStep || step, step, ":", Object.fromEntries(data));
    const response = await axiosInstance.post(AK.KYC_VERIFICATION, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      setFieldErrors({ ...fieldErrors, ...Object.fromEntries(Object.keys(fieldErrors).map((k) => [k, []])) });
      if (screen === 0) {
        setScreen(1);
        setStep(1);
      } else if (screen === 1) {
        if ((subStep || step) < 4) {
          setStep((prev) => (prev + 1) as Step);
        } else {
          setScreen(2);
          setStep(1);
          await fetchKycData();
        }
      } else if (screen === 2) {
        if (step === 1) {
          setStep(2);
        } else if (step === 2) {
          setScreen(3);
          setStep(1);
          await fetchKycData();
        }
      } else if (screen === 3) {
        if (businessType === 1) {
          if (step === 1) {
            setStep(2);
          } else if (step === 2) {
            setIsComplete(true);
            // setStep(1);
            // await fetchKycData();
          }
        } else if (businessType === 2 || businessType === 3) {
          if (confirm) {
            // setScreen(4);
            // setStep(1);
            setIsComplete(true);
            // await fetchKycData();
          } else if (currentIndex < partnerDetails?.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setShowConfirmPopup(true);
          }
        } else if (businessType === 4) {
          if (confirm) {
            // setScreen(4);
            // setStep(1);
            setIsComplete(true);
            // await fetchKycData();
          } else if (currentIndex < directorDetails?.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setShowConfirmPopup(true);
          }
        }
      } else if (screen === 4) {
        setIsComplete(true);
      }
    } else {
      const apiErrors = response.data.errors || {};
      const newFieldErrors: Record<string, string[]> = { ...fieldErrors };
      Object.keys(apiErrors).forEach((key) => {
        newFieldErrors[key] = apiErrors[key];
      });
      setFieldErrors(newFieldErrors);
      // Only set error if no field-specific errors are present
      if (Object.keys(apiErrors).length === 0) {
        setError(response.data.message || "An error occurred while submitting the form.");
      }
    }
  } catch (error: any) {
    console.error("Submission error:", error);
    const apiErrors = error.response?.data?.errors || {};
    const newFieldErrors: Record<string, string[]> = { ...fieldErrors };
    Object.keys(apiErrors).forEach((key) => {
      newFieldErrors[key] = apiErrors[key];
    });
    setFieldErrors(newFieldErrors);
    // Only set error if no field-specific errors are present
    if (Object.keys(apiErrors).length === 0) {
      setError(error.response?.data?.message || "An error occurred while submitting the form.");
    }
  } finally {
    setIsSubmitting(false);
  }
}

const handleContinue = async () => {
  setError(null); // Clear previous errors
  if (screen === 3 && kycDetailsRef.current) {
    const isValid = await kycDetailsRef.current.handleContinue();
    if (!isValid) {
      return;
    }
    return;
  }
  const validationError = validateStep();
  if (validationError) {
    setError(validationError);
    return;
  }
  await submitStepData(undefined, screen === 1 ? step : undefined);
};

  const handleSubStepComplete = (formData: FormData, confirm: boolean) => {
    submitStepData(formData, undefined, confirm);
  };

  const containerBase = "fixed inset-0 flex items-start md:items-center justify-center z-50 p-0 md:p-4";

  if (!open) return null;

  if (isLoading) {
    return (
      <div className={containerBase} aria-modal="true" role="dialog">
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        <div className="relative z-10 flex items-center justify-center w-full max-w-full md:max-w-4xl h-full md:h-[90vh] bg-white rounded-[8px]">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    );
  }

  // console.log("screen",screen)

  return (
    <div className={containerBase} aria-modal="true" role="dialog">
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-full md:max-w-4xl h-full md:h-[90vh] max-h-screen md:max-h-[700px] shadow-xl md:grid md:grid-cols-2 overflow-hidden rounded-none md:rounded-[8px]">
        <ProgressPane
          screen={screen}
          onBack={() => {
            if (screen > 1) {
              setScreen((s) => s - 1);
              setError(null);
            } else if (step > 1) {
              setStep((s) => (s - 1) as Step);
              setScreen(1);
              setError(null);
            } else {
              onClose();
            }
          }}
        />
        <div className="p-[16px] md:p-[40px] flex flex-col overflow-y-auto scrollbar-green max-h-screen rounded-none md:rounded-[8px] md:max-h-[90vh] justify-between h-full bg-white">

          <div>
                     <div className="flex md:hidden justify-center items-center gap-[15px] block  mb-[40px]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>

            <div className="flex items-start justify-between">
              <h2 className="text-[#272727] font-['Familjen Grotesk'] text-[32px] font-bold leading-[32px] tracking-[-0.64px] md:whitespace-nowrap mb-[24px]">
                {isComplete
                  ? "Registration Complete"
                  : step === 1 && screen === 1
                    ? "Tell us about your business"
                    : step === 1 && screen === 2
                      ? "Bank Details"
                      : step === 2 && screen === 2
                        ? "Bank Details"
                        : step === 1 && screen === 3
                          ? "KYC Details"
                          : step === 1 && screen === 4
                            ? "Aadhaar Details"
                            : "Business Onboarding"}
              </h2>
            </div>
            <div className="">
              {isComplete ? (
                <RegistrationComplete onClose={onClose} />
              ) : screen === 0 ? (
                <BusinessTypeSelect
                  businessType={businessType.toString()}
                  lockedType={lockedType}
                  error={error}
                  onChange={(value) => setBusinessType(Number(value) as BusinessType)}
                />
              ) : screen === 1 ? (
                <DynamicBusinessFields
                  business_type={businessType}
                  step_id={step}
                  screen_id={screen}
                  business_text_details={businessTextDetails}
                  business_file_details={businessFileDetails}
                  error={error}
                  field_errors={fieldErrors}
                  setBusinessTextDetails={setBusinessTextDetails}
                  setBusinessFileDetails={setBusinessFileDetails}
                  partner_details={partnerDetails}
                  director_details={directorDetails}
                  setPartnerDetails={setPartnerDetails}
                  setDirectorDetails={setDirectorDetails}
                />
              ) : screen === 2 ? (
                <BankFields
                  step={step}
                  screen={screen}
                  bank={bank}
                  setBank={setBank}
                   error={error}
                  fieldErrors={fieldErrors}
                  setBusinessTextDetails={setBusinessTextDetails}
                />
              ) : step === 1 || (step === 2 && screen === 3) ? (
                <KycDetails
                  ref={kycDetailsRef}
                  step={step}
                  screen={screen}
                  business_type={businessType}
                  aadhaar={aadhaar}
                  setAadhaar={setAadhaar}
                  partnerDetails={businessType === 2 || businessType === 3 ? partnerDetails : []}
                  setPartnerDetails={setPartnerDetails}
                  directorDetails={businessType === 4 ? directorDetails : []}
                  setDirectorDetails={setDirectorDetails}
                  error={error}
                  fieldErrors={fieldErrors}
                  businessTextDetails={businessTextDetails}
                  setBusinessTextDetails={setBusinessTextDetails}
                  businessFileDetails={businessFileDetails}
                  setBusinessFileDetails={setBusinessFileDetails}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                  onConfirm={handleSubStepComplete}
                  showConfirmPopup={showConfirmPopup}
                  setShowConfirmPopup={setShowConfirmPopup}
                />
              ) : null}
            </div>
            {!isComplete && screen !== 3 && (
              <div className="flex mt-[16px] w-full items-center gap-3">
                <button
                  onClick={handleContinue}
                  disabled={isSubmitting}
                  className={`h-9 rounded-md flex justify-center items-center text-center w-full px-5 text-white text-sm font-medium transition ${isSubmitting ? "bg-[#22A31A]/50 cursor-not-allowed" : "bg-[#124CBE] hover:bg-[#002f8b]"
                    }`}
                  
                >
                  {isSubmitting ? (
                    <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                  ) : step < 4 ? (
                    "Continue"
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="mt-[16px]">
            {error && !isComplete && (
              <div className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-md" >
                {error}
              </div>
            )}
            <p className="mt-4 text-[#6E6E6E] text-xs leading-5" >
              We collect this to set up your merchant profile and ensure RBI compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

