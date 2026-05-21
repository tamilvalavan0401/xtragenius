"use client";

import * as React from "react";
import { motion } from "framer-motion";
import SvgIcons from "@/components/SvgIcons";
import { Bars } from "react-loader-spinner";

interface KycDetailsProps {
  step: number;
  screen: number;
  business_type: any;
  aadhaar: { aadhar_no: string; aadhaarFile: File | null };
  setAadhaar: React.Dispatch<React.SetStateAction<{ aadhar_no: string; aadhaarFile: File | null }>>;
  partnerDetails: { name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null; dinNo?: string; dinFile?: File | null }[];
  setPartnerDetails: React.Dispatch<React.SetStateAction<{ name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null; dinNo?: string; dinFile?: File | null }[]>>;
  directorDetails: { dinNo: string; dinFile: File | null; name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null }[];
  setDirectorDetails: React.Dispatch<React.SetStateAction<{ dinNo: string; dinFile: File | null; name: string; pan: string; panFile: File | null; aadhaar: string; aadhaarFile: File | null }[]>>;
  error: string | null;
  fieldErrors: Record<string, string[]>;
  businessTextDetails: Record<string, string>;
  setBusinessTextDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  businessFileDetails: Record<string, File | null>;
  setBusinessFileDetails: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onConfirm: (formData: FormData, confirm: boolean) => void;
  showConfirmPopup: boolean;
  setShowConfirmPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KycDetails = React.forwardRef<{ handleContinue: () => Promise<boolean> }, KycDetailsProps>(
  (
    {
      step,
      screen,
      business_type,
      aadhaar,
      setAadhaar,
      partnerDetails,
      setPartnerDetails,
      directorDetails,
      setDirectorDetails,
      error,
      fieldErrors,
      businessTextDetails,
      setBusinessTextDetails,
      businessFileDetails,
      setBusinessFileDetails,
      currentIndex,
      setCurrentIndex,
      onConfirm,
      showConfirmPopup,
      setShowConfirmPopup,
      setIsSubmitting,
      isSubmitting,
    },
    ref
  ) => {
    const inputBase =
      "h-9 w-full rounded-md border bg-white px-3 text-sm text-[#272727] font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent";

    const FILE_FIELDS = [
      "aadhaarFile",
      "partner_0_pan_file",
      "partner_0_aadhaar_file",
      "partner_0_din_file",
      "director_0_pan_file",
      "director_0_aadhaar_file",
      "director_0_din_file",
    ] as const;
    type FileField = typeof FILE_FIELDS[number];

    console.log("showConfirmPopup", showConfirmPopup);
    const [passwords, setPasswords] = React.useState<Record<string, string>>({});
    const [isPasswordProtected, setIsPasswordProtected] = React.useState<Record<string, boolean>>({});
    const [validationError, setValidationError] = React.useState<Record<string, string>>({});
    const [isFileSaved, setIsFileSaved] = React.useState<Record<string, boolean>>({});
    const [isFilePasswordSaved, setIsFilePasswordSaved] = React.useState<Record<string, boolean>>({});
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [showPartnerConfirmCheckbox, setShowPartnerConfirmCheckbox] = React.useState(partnerDetails?.length === 1);
    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const [showConfirmButton, setShowConfirmButton] = React.useState(false);
    React.useEffect(() => {
      if (screen === 3 && (business_type === 2 || business_type === 3)) {
        // Show Confirm button when there is at least one partner
        setShowConfirmButton(partnerDetails?.length > 0);
        // Show checkbox only when there is exactly one partner or after submission of the last partner
        setShowPartnerConfirmCheckbox(partnerDetails?.length === 1);
      }
    }, [screen, business_type, partnerDetails?.length]);

    React.useEffect(() => {
      const updatedPasswords: Record<string, string> = {};
      const updatedIsPasswordProtected: Record<string, boolean> = {};
      const updatedIsFileSaved: Record<string, boolean> = {};
      const updatedIsFilePasswordSaved: Record<string, boolean> = {};

      updatedPasswords["aadhaarFile"] = "";
      updatedIsPasswordProtected["aadhaarFile"] = false;
      updatedIsFileSaved["aadhaarFile"] = false;
      updatedIsFilePasswordSaved["aadhaarFile"] = false;

      partnerDetails.forEach((_, index) => {
        updatedPasswords[`partner_${index}_pan_file`] = "";
        updatedPasswords[`partner_${index}_aadhaar_file`] = "";
        updatedPasswords[`partner_${index}_din_file`] = "";
        updatedIsPasswordProtected[`partner_${index}_pan_file`] = false;
        updatedIsPasswordProtected[`partner_${index}_aadhaar_file`] = false;
        updatedIsPasswordProtected[`partner_${index}_din_file`] = false;
        updatedIsFileSaved[`partner_${index}_pan_file`] = false;
        updatedIsFileSaved[`partner_${index}_aadhaar_file`] = false;
        updatedIsFileSaved[`partner_${index}_din_file`] = false;
        updatedIsFilePasswordSaved[`partner_${index}_pan_file`] = false;
        updatedIsFilePasswordSaved[`partner_${index}_aadhaar_file`] = false;
        updatedIsFilePasswordSaved[`partner_${index}_din_file`] = false;
      });

      directorDetails.forEach((_, index) => {
        updatedPasswords[`director_${index}_pan_file`] = "";
        updatedPasswords[`director_${index}_aadhaar_file`] = "";
        updatedPasswords[`director_${index}_din_file`] = "";
        updatedIsPasswordProtected[`director_${index}_pan_file`] = false;
        updatedIsPasswordProtected[`director_${index}_aadhaar_file`] = false;
        updatedIsPasswordProtected[`director_${index}_din_file`] = false;
        updatedIsFileSaved[`director_${index}_pan_file`] = false;
        updatedIsFileSaved[`director_${index}_aadhaar_file`] = false;
        updatedIsFileSaved[`director_${index}_din_file`] = false;
        updatedIsFilePasswordSaved[`director_${index}_pan_file`] = false;
        updatedIsFilePasswordSaved[`director_${index}_aadhaar_file`] = false;
        updatedIsFilePasswordSaved[`director_${index}_din_file`] = false;
      });

      setPasswords(updatedPasswords);
      setIsPasswordProtected(updatedIsPasswordProtected);
      setIsFileSaved(updatedIsFileSaved);
      setIsFilePasswordSaved(updatedIsFilePasswordSaved);
    }, [partnerDetails?.length, directorDetails?.length]);

    // console.log("directorDetails", directorDetails);
    React.useEffect(() => {
      if (passwordInputRef.current && Object.values(isPasswordProtected).some((v) => v)) {
        passwordInputRef.current.focus();
      }
    }, [isPasswordProtected]);

    React.useEffect(() => {
      if (screen === 3 && (business_type === 2 || business_type === 3) && partnerDetails?.length === 0) {
        setPartnerDetails([
          { name: "", pan: "", panFile: null, aadhaar: "", aadhaarFile: null, dinNo: "", dinFile: null },
        ]);
        setShowPartnerConfirmCheckbox(true); // Show checkbox when first partner is added
      }
    }, [screen, business_type, partnerDetails?.length, setPartnerDetails]);

    const handleFileRemove = (field: string) => {
      if (field.startsWith("partner_")) {
        const [, index, fileType] = field.split("_");
        const idx = parseInt(index);
        setPartnerDetails((prev) =>
          prev.map((partner, i) => (i === idx ? { ...partner, [fileType + "File"]: null } : partner))
        );
      } else if (field.startsWith("director_")) {
        const [, index, fileType] = field.split("_");
        const idx = parseInt(index);
        setDirectorDetails((prev) =>
          prev.map((director, i) => (i === idx ? { ...director, [fileType + "File"]: null } : director))
        );
      } else if (field === "aadhaarFile") {
        setAadhaar((prev) => ({ ...prev, aadhaarFile: null }));
      }
      setIsPasswordProtected((s) => ({ ...s, [field]: false }));
      setPasswords((s) => ({ ...s, [field]: "" }));
      setValidationError((s) => ({ ...s, [field]: "" }));
      setIsFileSaved((s) => ({ ...s, [field]: false }));
      setIsFilePasswordSaved((s) => ({ ...s, [field]: false }));
    };

    const handlePasswordChange = (field: string, value: string) => {
      setPasswords((s) => ({ ...s, [field]: value }));
      setBusinessTextDetails((s) => ({ ...s, [`${field}_password`]: value }));
      if (validationError[field]) {
        setValidationError((s) => ({ ...s, [field]: "" }));
      }
    };

    const handleUnlockSave = (field: string) => {
      if (!passwords[field] && isPasswordProtected[field]) {
        setValidationError((s) => ({ ...s, [field]: "Please enter a password." }));
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
          passwordInputRef.current.className += " border-red-500";
        }
      } else {
        setIsFilePasswordSaved((s) => ({ ...s, [field]: true }));
        setIsPasswordProtected((s) => ({ ...s, [field]: false }));
        setIsFileSaved((s) => ({ ...s, [field]: true }));
        setValidationError((s) => ({ ...s, [field]: "" }));
      }
    };

    const handleAddPartner = () => {
      setPartnerDetails((prev) => [
        ...prev,
        { name: "", pan: "", panFile: null, aadhaar: "", aadhaarFile: null, dinNo: "", dinFile: null },
      ]);
      setCurrentIndex((prev) => prev + 1); // Advance to the newly added partner
      setShowPartnerConfirmCheckbox(false); // Hide checkbox when adding a new partner
      setShowConfirmButton(true); // Ensure Confirm button remains visible
      setIsConfirmed(false); // Reset confirmation
    };

    const handlePartnerChange = (index: number, field: string, value: string | File | null) => {
      setPartnerDetails((prev) =>
        prev.map((partner, i) => (i === index ? { ...partner, [field]: value } : partner))
      );
    };

    const handleDirectorChange = (index: number, field: string, value: string | File | null) => {
      setDirectorDetails((prev) =>
        prev.map((director, i) => (i === index ? { ...director, [field]: value } : director))
      );
    };

const validateForm = (): boolean => {
  const newValidationError: Record<string, string> = {};
  let isValid = true;

  if (screen === 3) {
    if (business_type === 1) {
      if (step === 1 && !aadhaar.aadhar_no.trim()) {
        newValidationError["aadhar_no"] = "Aadhaar number is required.";
        isValid = false;
      }
      if (step === 2) {
        if (!aadhaar.aadhaarFile) {
          newValidationError["aadhaarFile"] = "Aadhaar file is required.";
          isValid = false;
        }
        if (isPasswordProtected["aadhaarFile"] && !isFilePasswordSaved["aadhaarFile"]) {
          newValidationError["aadhaarFile"] = "Please enter a password for Aadhaar document.";
          isValid = false;
        }
      }
    } else if (business_type === 2 || business_type === 3) {
      const partner = partnerDetails[currentIndex];
      if (!partner.name.trim()) {
        newValidationError[`partner_name_${currentIndex}`] = `Partner ${currentIndex + 1} name is required.`;
        isValid = false;
      }
      if (!partner.pan.trim()) {
        newValidationError[`partner_pan_${currentIndex}`] = `Partner ${currentIndex + 1} PAN is required.`;
        isValid = false;
      }
      if (!partner.panFile) {
        newValidationError[`partner_${currentIndex}_pan_file`] = `Partner ${currentIndex + 1} PAN file is required.`;
        isValid = false;
      }
      if (isPasswordProtected[`partner_${currentIndex}_pan_file`] && !isFilePasswordSaved[`partner_${currentIndex}_pan_file`]) {
        newValidationError[`partner_${currentIndex}_pan_file`] = `Please enter a password for Partner ${currentIndex + 1} PAN document.`;
        isValid = false;
      }
      if (!partner.aadhaar.trim()) {
        newValidationError[`partner_aadhaar_${currentIndex}`] = `Partner ${currentIndex + 1} Aadhaar is required.`;
        isValid = false;
      }
      if (!partner.aadhaarFile) {
        newValidationError[`partner_${currentIndex}_aadhaar_file`] = `Partner ${currentIndex + 1} Aadhaar file is required.`;
        isValid = false;
      }
      if (isPasswordProtected[`partner_${currentIndex}_aadhaar_file`] && !isFilePasswordSaved[`partner_${currentIndex}_aadhaar_file`]) {
        newValidationError[`partner_${currentIndex}_aadhaar_file`] = `Please enter a password for Partner ${currentIndex + 1} Aadhaar document.`;
        isValid = false;
      }
      if (business_type === 3) {
        if (!partner.dinNo?.trim()) {
          newValidationError[`partner_din_no_${currentIndex}`] = `Partner ${currentIndex + 1} DIN is required.`;
          isValid = false;
        }
        if (!partner.dinFile) {
          newValidationError[`partner_${currentIndex}_din_file`] = `Partner ${currentIndex + 1} DIN file is required.`;
          isValid = false;
        }
        if (isPasswordProtected[`partner_${currentIndex}_din_file`] && !isFilePasswordSaved[`partner_${currentIndex}_din_file`]) {
          newValidationError[`partner_${currentIndex}_din_file`] = `Please enter a password for Partner ${currentIndex + 1} DIN document.`;
          isValid = false;
        }
      }
    } else if (business_type === 4) {
      const director = directorDetails[currentIndex];
      if (!director.dinNo.trim()) {
        newValidationError[`director_din_no_${currentIndex}`] = `Director ${currentIndex + 1} DIN is required.`;
        isValid = false;
      }
      if (!director.dinFile) {
        newValidationError[`director_${currentIndex}_din_file`] = `Director ${currentIndex + 1} DIN file is required.`;
        isValid = false;
      }
      if (isPasswordProtected[`director_${currentIndex}_din_file`] && !isFilePasswordSaved[`director_${currentIndex}_din_file`]) {
        newValidationError[`director_${currentIndex}_din_file`] = `Please enter a password for Director ${currentIndex + 1} DIN document.`;
        isValid = false;
      }
      if (!director.name.trim()) {
        newValidationError[`director_name_${currentIndex}`] = `Director ${currentIndex + 1} name is required.`;
        isValid = false;
      }
      if (!director.pan.trim()) {
        newValidationError[`director_pan_${currentIndex}`] = `Director ${currentIndex + 1} PAN is required.`;
        isValid = false;
      }
      if (!director.panFile) {
        newValidationError[`director_${currentIndex}_pan_file`] = `Director ${currentIndex + 1} PAN file is required.`;
        isValid = false;
      }
      if (isPasswordProtected[`director_${currentIndex}_pan_file`] && !isFilePasswordSaved[`director_${currentIndex}_pan_file`]) {
        newValidationError[`director_${currentIndex}_pan_file`] = `Please enter a password for Director ${currentIndex + 1} PAN document.`;
        isValid = false;
      }
      if (!director.aadhaar.trim()) {
        newValidationError[`director_aadhaar_${currentIndex}`] = `Director ${currentIndex + 1} Aadhaar is required.`;
        isValid = false;
      }
      if (!director.aadhaarFile) {
        newValidationError[`director_${currentIndex}_aadhaar_file`] = `Director ${currentIndex + 1} Aadhaar file is required.`;
        isValid = false;
      }
      if (isPasswordProtected[`director_${currentIndex}_aadhaar_file`] && !isFilePasswordSaved[`director_${currentIndex}_aadhaar_file`]) {
        newValidationError[`director_${currentIndex}_aadhaar_file`] = `Please enter a password for Director ${currentIndex + 1} Aadhaar document.`;
        isValid = false;
      }
    }
  }

  setValidationError(newValidationError);
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return false;
  }
  setIsSubmitting(true);
  const formData = new FormData();
  if (screen === 3) {
    if (business_type === 1) {
      if (step === 1) {
        formData.append("aadhar_no", aadhaar.aadhar_no || "");
      } else if (step === 2) {
        if (aadhaar.aadhaarFile) {
          formData.append("aadhar_file", aadhaar.aadhaarFile);
          formData.append("aadhar_file_password", passwords["aadhaarFile"] || "");
        }
      }
    } else if (business_type === 2 || business_type === 3) {
      const partner = partnerDetails[currentIndex];
      formData.append(`name`, partner.name || "");
      formData.append(`pan`, partner.pan || "");
      if (partner.panFile) {
        formData.append(`pan_file`, partner.panFile);
        formData.append(`pan_file_password`, passwords[`partner_${currentIndex}_pan_file`] || "");
      }
      formData.append(`aadhar`, partner.aadhaar || "");
      if (partner.aadhaarFile) {
        formData.append(`aadhar_file`, partner.aadhaarFile);
        formData.append(`aadhar_file_password`, passwords[`partner_${currentIndex}_aadhaar_file`] || "");
      }
      if (business_type === 3 && partner.dinNo) {
        formData.append(`din`, partner.dinNo || "");
        if (partner.dinFile) {
          formData.append(`din_file`, partner.dinFile);
          formData.append(`din_file_password`, passwords[`partner_${currentIndex}_din_file`] || "");
        }
      }
    } else if (business_type === 4) {
      const director = directorDetails[currentIndex];
      formData.append(`din`, director.dinNo || "");
      if (director.dinFile) {
        formData.append(`din_file`, director.dinFile);
        formData.append(`din_file_password`, passwords[`director_${currentIndex}_din_file`] || "");
      }
      formData.append(`name`, director.name || "");
      formData.append(`pan`, director.pan || "");
      if (director.panFile) {
        formData.append(`pan_file`, director.panFile);
        formData.append(`pan_file_password`, passwords[`director_${currentIndex}_pan_file`] || "");
      }
      formData.append(`aadhar`, director.aadhaar || "");
      if (director.aadhaarFile) {
        formData.append(`aadhar_file`, director.aadhaarFile);
        formData.append(`aadhar_file_password`, passwords[`director_${currentIndex}_aadhaar_file`] || "");
      }
      if (isConfirmed && currentIndex === directorDetails?.length - 1) {
        formData.append("confirm", "true");
      }
    }
  }
  // console.log("Submitting FormData:", Object.fromEntries(formData));
  try {
    await onConfirm(formData, false);
    setValidationError({}); // Clear client-side validation errors on success
    if (business_type === 2 || business_type === 3) {
      if (currentIndex === partnerDetails?.length - 1) {
        setShowPartnerConfirmCheckbox(true);
        setShowConfirmButton(true);
      } else {
        setCurrentIndex(currentIndex + 1); // Move to next partner
        setShowPartnerConfirmCheckbox(partnerDetails?.length === 1);
      }
    }
    return true;
  } catch (error: any) {
    console.error("Submission error:", error);
    if (error.response?.data?.errors) {
      const apiErrors = error.response.data.errors;
      const newValidationError: Record<string, string> = {};
      Object.keys(apiErrors).forEach((key) => {
        const fieldKey = key === "aadhar_no" ? "aadhar_no" : 
                        key.startsWith("partner_") ? `partner_${key.split("_")[1]}_${key.split("_")[2]}` :
                        key.startsWith("director_") ? `director_${key.split("_")[1]}_${key.split("_")[2]}` : key;
        newValidationError[fieldKey] = apiErrors[key][0];
      });
      setValidationError((prev) => ({ ...prev, ...newValidationError }));
    }
    return false;
  } 
};

const handleConfirmSubmit = async () => {
  if (!isConfirmed) {
    setValidationError({ confirm: "Please confirm the details by checking the box." });
    return;
  }
  setIsSubmitting(true);
  const formData = new FormData();
  formData.append("confirm", "true");
  try {
    await onConfirm(formData, true);
    setShowConfirmPopup(false);
    setShowPartnerConfirmCheckbox(false);
    setValidationError({}); // Clear errors on successful confirmation
  } catch (error: any) {
    console.error("Submission error:", error);
    if (error.response?.data?.errors) {
      const apiErrors = error.response.data.errors;
      const newValidationError: Record<string, string> = {};
      Object.keys(apiErrors).forEach((key) => {
        const fieldKey = key === "aadhar_no" ? "aadhar_no" : 
                        key.startsWith("partner_") ? `partner_${key.split("_")[1]}_${key.split("_")[2]}` :
                        key.startsWith("director_") ? `director_${key.split("_")[1]}_${key.split("_")[2]}` : key;
        newValidationError[fieldKey] = apiErrors[key][0];
      });
      setValidationError((prev) => ({ ...prev, ...newValidationError }));
    }
  } 
};

    React.useImperativeHandle(ref, () => ({
      handleContinue: async () => {
        return await handleSubmit();
      },
    }));

    type FileKeys = "panFile" | "aadhaarFile" | "dinFile";

    const getFileName = (field: string): string | undefined => {
      if (field.startsWith("partner_")) {
        const [, index, fileType] = field.split("_");
        const idx = parseInt(index);
        const key = `${fileType}File` as FileKeys;
        return partnerDetails[idx]?.[key]?.name;
      } else if (field.startsWith("director_")) {
        const [, index, fileType] = field.split("_");
        const idx = parseInt(index);
        const key = `${fileType}File` as FileKeys;
        return directorDetails[idx]?.[key]?.name;
      } else if (field === "aadhaarFile") {
        return aadhaar.aadhaarFile?.name;
      }
      return undefined;
    };

    // console.log("fieldErrors",fieldErrors)

    const renderFileUploadSection = (
      field: string,
      label: string,
      errorMessage: string,
      id: string,
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    ) => (
      <div className="mb-4">
        <label
          className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px] block"
          htmlFor={id}
        >
          {label}
        </label>
        <motion.div
          animate={
            fieldErrors[field]?.length || validationError[field] ? { x: [-10, 10, -10, 10, 0] } : {}
          }
          transition={{ duration: 0.4 }}
        >
          {!isFileSaved[field] ? (
            <>
              <input
                type="file"
                id={id}
                name={id}
                className="hidden"
                accept="application/pdf"
                onChange={(e) => {
                  // console.log(`File input triggered for ${field}`, e.target.files);
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                      setValidationError((s) => ({ ...s, [field]: "File size must be within 5MB." }));
                      return;
                    }
                    if (onChange) {
                      onChange(e);
                    } else {
                      if (field.startsWith("partner_")) {
                        const [, index, fileType] = field.split("_");
                        const idx = parseInt(index);
                        setPartnerDetails((prev) =>
                          prev.map((partner, i) =>
                            i === idx ? { ...partner, [`${fileType}File`]: file } : partner
                          )
                        );
                      } else if (field.startsWith("director_")) {
                        const [, index, fileType] = field.split("_");
                        const idx = parseInt(index);
                        setDirectorDetails((prev) =>
                          prev.map((director, i) =>
                            i === idx ? { ...director, [`${fileType}File`]: file } : director
                          )
                        );
                      } else if (field === "aadhaarFile") {
                        setAadhaar((prev) => ({ ...prev, aadhaarFile: file }));
                      }
                    }
                    setValidationError((s) => ({ ...s, [field]: "" }));
                    setIsFileSaved((s) => ({ ...s, [field]: true }));
                  }
                }}
              />
              <label
                htmlFor={id}
                className={`flex items-center h-[80px] justify-center gap-2 w-full cursor-pointer rounded-lg border-2 border-dashed p-4 text-sm text-[#868EA4]  text-[14px] font-normal hover:bg-gray-50 transition z-10
                ${fieldErrors[field]?.length || validationError[field] ? "border-red-500 text-red-500" : "border-[#868EA4]"}`}
              >
                <SvgIcons.FileUpload
                  className={fieldErrors[field]?.length || validationError[field] ? "#EF4444" : "#868EA4"}
                />
                <span>Upload File (PDF within 5MB)</span>
              </label>
              {(fieldErrors[field]?.length || validationError[field]) && (
                <p className="text-red-500 text-xs mt-1" >
                  {fieldErrors[field]?.[0] || validationError[field]}
                </p>
              )}
            </>
          ) : (
            <div className="flex w-full p-3 flex-col justify-center items-start gap-2 rounded-lg bg-[#F4F4F5]">
              <div className="flex justify-between w-full items-center">
                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[#272727]  text-[14px] font-normal flex items-center gap-1">
                  <SvgIcons.Document />
                  {getFileName(field) ?? `${label} File`}
                </div>
                <span className="text-black cursor-pointer" onClick={() => handleFileRemove(field)}>
                  <SvgIcons.PopupClose />
                </span>
              </div>
              <div className="bg-[#EDEDEF] h-[1px] w-full" />
              {!isFilePasswordSaved[field] && (
                <div className="flex items-center gap-1">
                  <div className="inline-flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={isPasswordProtected[field] || false}
                        onChange={(e) =>
                          setIsPasswordProtected((s) => ({ ...s, [field]: e.target.checked }))
                        }
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#124CBE] checked:border-[#124CBE]"
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>
                  </div>
                  <p className="text-[#272727]  text-[13px] font-normal">
                    This document is password-protected
                  </p>
                </div>
              )}
              {!isFilePasswordSaved[field] && isPasswordProtected[field] && (
                <>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      ref={passwordInputRef}
                      placeholder="Enter document password"
                      className={`flex placeholder:text-[#272727] placeholder: placeholder:text-[14px] placeholder:font-normal h-[36px] w-full px-[12px] py-[8px] items-center gap-[6px] flex-1 rounded-[8px] border border-[#868EA4] bg-white text-[#272727]  text-[14px] font-normal ${validationError[field] ? "border-red-500" : ""}`}
                      type="password"
                      value={passwords[field] || ""}
                      onChange={(e) => handlePasswordChange(field, e.target.value)}
                    />
                    <button
                      className="flex h-[36px] px-[20px] py-[10px] justify-center items-center gap-[4px] rounded-[8px] border border-[#124CBE] bg-white text-[#124CBE] text-center  text-[14px] font-medium"
                      onClick={() => handleUnlockSave(field)}
                    >
                      Unlock & Save
                    </button>
                  </div>
                  {validationError[field] && (
                    <p className="text-red-500 text-xs mt-1" >
                      {validationError[field]}
                    </p>
                  )}
                </>
              )}
              {isFilePasswordSaved[field] && (
                <p className="text-[#272727]  text-[13px] font-normal">
                  Your document has been saved securely.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    );

    if (!businessTextDetails) {
      console.error("businessTextDetails is undefined");
      return <div>Error: Business details not loaded. Please try again.</div>;
    }
console.log("isSubmitting",isSubmitting)
    return (
      <div className="space-y-[16px] relative">
        {screen === 3 && (
          <>
            {business_type === 1 && (
              <>
                {step === 1 && (
                  <div>
                    <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
                      Aadhaar Number
                    </label>
                    <motion.div
                      animate={fieldErrors["aadhar_no"]?.length || validationError["aadhar_no"] ? { x: [-10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      
                      <input
                        className={`${inputBase} ${fieldErrors["aadhar_no"]?.length || validationError["aadhar_no"] ? "border-red-500" : "border-[#868EA4]"}`}
                        placeholder="Enter Aadhaar number"
                        value={aadhaar.aadhar_no}
                        onChange={(e) => setAadhaar((prev) => ({ ...prev, aadhar_no: e.target.value }))}
                        
                      />
                      {(fieldErrors["aadhar_no"]?.length || validationError["aadhar_no"]) && (
                        <p className="text-red-500 text-xs mt-1" >
                          {fieldErrors["aadhar_no"]?.[0] || validationError["aadhar_no"]}
                        </p>
                      )}
                    </motion.div>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="h-9 rounded-md flex items-center justify-center mt-[16px] text-center w-full px-5 text-white text-sm font-medium bg-[#124CBE] hover:bg-[#002f8b]"
                      
                    >
                      {isSubmitting ? (
                        <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <>
                    {renderFileUploadSection(
                      "aadhaarFile",
                      "Aadhaar Document",
                      "Please upload Aadhaar Document.",
                      "aadhaar-document-upload",
                      (e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 5 * 1024 * 1024) {
                          setValidationError((s) => ({ ...s, aadhaarFile: "File size must be within 5MB." }));
                          return;
                        }
                        setAadhaar((prev) => ({ ...prev, aadhaarFile: file || null }));
                        setValidationError((s) => ({ ...s, aadhaarFile: "" }));
                      }
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="h-9 rounded-md mt-[16px] flex items-center justify-center text-center  w-full px-5 text-white text-sm font-medium bg-[#124CBE] hover:bg-[#002f8b]"
                      
                    >
                      {isSubmitting ? (
                        <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </>
                )}
              </>
            )}
            {(business_type === 2 || business_type === 3 || business_type === 4) && !showConfirmPopup && (
              <>
                {(business_type === 2 || business_type === 3 ? partnerDetails : directorDetails).slice(currentIndex, currentIndex + 1).map((item, index) => (
                  <div key={index} className={`${(business_type === 2 || business_type === 3) ? "pb-4 border-b border-[#EDEDEF]" : ""} space-y-[16px]   mb-4`}>
                    <h3 className="text-[#272727] pl-1 border-l-[3px] border-l-[#124CBE]  text-[16px] not-italic font-semibold leading-[100%]">
                      {business_type === 2 || business_type === 3 ? `Partner ${currentIndex + 1}` : `Director ${currentIndex + 1}`}
                    </h3>
                    <div>
                      <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
                        Name
                      </label>
                      <motion.div
                        animate={fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`] ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <input
                          className={`${inputBase} ${fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`] ? "border-red-500" : "border-[#868EA4]"}`}
                          placeholder="Enter name"
                          value={item.name}
                          onChange={(e) =>
                            business_type === 2 || business_type === 3
                              ? handlePartnerChange(currentIndex, "name", e.target.value)
                              : handleDirectorChange(currentIndex, "name", e.target.value)
                          }
                          
                        />
                        {(fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]) && (
                          <p className="text-red-500 text-xs mt-1" >
                            {fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]?.[0] || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_name_${currentIndex}`]}
                          </p>
                        )}
                      </motion.div>
                    </div>
                    <div>
                      <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
                        PAN
                      </label>
                      <motion.div
                        animate={fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`] ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <input
                          className={`${inputBase} ${fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`] ? "border-red-500" : "border-[#868EA4]"}`}
                          placeholder="Enter PAN"
                          value={item.pan}
                          onChange={(e) =>
                            business_type === 2 || business_type === 3
                              ? handlePartnerChange(currentIndex, "pan", e.target.value)
                              : handleDirectorChange(currentIndex, "pan", e.target.value)
                          }
                          
                        />
                        {(fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]) && (
                          <p className="text-red-500 text-xs mt-1" >
                            {fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]?.[0] || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_pan_${currentIndex}`]}
                          </p>
                        )}
                      </motion.div>
                    </div>
                    {renderFileUploadSection(
                      `${business_type === 2 || business_type === 3 ? "partner" : "director"}_${currentIndex}_pan_file`,
                      "PAN Document",
                      "Please upload PAN Document.",
                      `pan-document-upload-${business_type}-${currentIndex}`,
                      (e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 5 * 1024 * 1024) {
                          setValidationError((s) => ({ ...s, [`${business_type === 2 || business_type === 3 ? "partner" : "director"}_${currentIndex}_pan_file`]: "File size must be within 5MB." }));
                          return;
                        }
                        business_type === 2 || business_type === 3
                          ? handlePartnerChange(currentIndex, "panFile", file || null)
                          : handleDirectorChange(currentIndex, "panFile", file || null);
                        setValidationError((s) => ({ ...s, [`${business_type === 2 || business_type === 3 ? "partner" : "director"}_${currentIndex}_pan_file`]: "" }));
                      }
                    )}
                    <div>
                      <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
                        Aadhaar
                      </label>
                      <motion.div
                        animate={fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`] ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <input
                          className={`${inputBase} ${fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`] ? "border-red-500" : "border-[#868EA4]"}`}
                          placeholder="Enter Aadhaar"
                          value={item.aadhaar}
                          onChange={(e) =>
                            business_type === 2 || business_type === 3
                              ? handlePartnerChange(currentIndex, "aadhaar", e.target.value)
                              : handleDirectorChange(currentIndex, "aadhaar", e.target.value)
                          }
                          
                        />
                        {(fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]?.length || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]) && (
                          <p className="text-red-500 text-xs mt-1" >
                            {fieldErrors[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]?.[0] || validationError[`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]}
                          </p>
                        )}
                      </motion.div>
                    </div>
                    {renderFileUploadSection(
                      `${business_type === 2 || business_type === 3 ? "partner" : "director"}_${currentIndex}_aadhaar_file`,
                      "Aadhaar Document",
                      "Please upload Aadhaar Document.",
                      `aadhaar-document-upload-${business_type}-${currentIndex}`,
                      (e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size > 5 * 1024 * 1024) {
                          setValidationError((s) => ({ ...s, [`${business_type === 2 || business_type === 3 ? "partner" : "director"}_${currentIndex}_aadhaar_file`]: "File size must be within 5MB." }));
                          return;
                        }
                        business_type === 2 || business_type === 3
                          ? handlePartnerChange(currentIndex, "aadhaarFile", file || null)
                          : handleDirectorChange(currentIndex, "aadhaarFile", file || null);
                        setValidationError((s) => ({ ...s, [`${business_type === 2 || business_type === 3 ? "partner" : "director"}_aadhaar_${currentIndex}`]: "" }));
                      }
                    )}
                    {(business_type === 3 || business_type === 4) && (
                      <>
                        <div>
                          <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
                            DIN
                          </label>
                          <motion.div
                            animate={fieldErrors[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]?.length || validationError[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`] ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <input
                              className={`${inputBase} ${fieldErrors[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]?.length || validationError[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`] ? "border-red-500" : "border-[#868EA4]"}`}
                              placeholder="Enter DIN"
                              value={item.dinNo}
                              onChange={(e) =>
                                business_type === 3
                                  ? handlePartnerChange(currentIndex, "dinNo", e.target.value)
                                  : handleDirectorChange(currentIndex, "dinNo", e.target.value)
                              }
                              
                            />
                            {(fieldErrors[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]?.length || validationError[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]) && (
                              <p className="text-red-500 text-xs mt-1" >
                                {fieldErrors[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]?.[0] || validationError[`${business_type === 3 ? "partner" : "director"}_din_no_${currentIndex}`]}
                              </p>
                            )}
                          </motion.div>
                        </div>
                        {renderFileUploadSection(
                          `${business_type === 3 ? "partner" : "director"}_${currentIndex}_din_file`,
                          "DIN Document",
                          "Please upload DIN Document.",
                          `din-document-upload-${business_type}-${currentIndex}`,
                          (e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size > 5 * 1024 * 1024) {
                              setValidationError((s) => ({ ...s, [`${business_type === 3 ? "partner" : "director"}_${currentIndex}_din_file`]: "File size must be within 5MB." }));
                              return;
                            }
                            business_type === 3
                              ? handlePartnerChange(currentIndex, "dinFile", e.target.files?.[0] || null)
                              : handleDirectorChange(currentIndex, "dinFile", e.target.files?.[0] || null);
                            setValidationError((s) => ({ ...s, [`${business_type === 3 ? "partner" : "director"}_${currentIndex}_din_file`]: "" }));
                          }
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div className="flex justify-between w-full items-center gap-4">
                  {(business_type === 2 || business_type === 3) && (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleAddPartner}
                        className="text-[#124CBE] flex items-center gap-2  text-[14px] font-medium"
                        
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 0.5V9.5M9.5 5H0.5" stroke="#124CBE" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> Add Partner
                      </button>

                      {showConfirmButton && (
                        <button
                          onClick={() => setShowConfirmPopup(true)} // Trigger popup on click
                          className="text-[#124CBE] flex items-center justify-end gap-2  text-[14px] font-medium"
                          
                        >
                          Confirm Partner
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-9 rounded-md flex items-center justify-center text-center  w-full px-5 text-white text-sm font-medium bg-[#124CBE] hover:bg-[#002f8b]"
                  
                >
                  {isSubmitting ? (
                    <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                  ) : (
                    "Continue"
                  )}
                </button>
              </>
            )}
            {showConfirmPopup && (business_type === 2 || business_type === 3 || business_type === 4) && (
              <div className="inset-0 top-1/2 flex items-center justify-center z-50 mt-10">
                <div className="bg-white p-4 rounded-lg  w-full max-w-md">
                  <h3 className="text-[#272727] font-['Familjen Grotesk'] text-[24px] font-bold mb-4">
                    Confirm {business_type === 2 || business_type === 3 ? "Partner" : "Director"} Details
                  </h3>
                  <div className="r gap-2 mb-4">
                    <div className="flex items-center gap-2 mb-4">

                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#124CBE] checked:border-[#124CBE]"
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </label>
                    <p className="text-[#272727]  text-[13px] font-normal">
                      Confirm completion of {business_type === 2 || business_type === 3 ? "partner" : "director"} details
                    </p>
                    </div>

                  {business_type === 2 || business_type === 3 && ( 
                     <button
                      onClick={() => {
                        setShowConfirmPopup(false);
                        handleAddPartner();
                      }}

                      className="text-[#124CBE] justify-end ml-auto flex items-center gap-2  text-[14px] font-medium"
                      
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 0.5V9.5M9.5 5H0.5" stroke="#124CBE" strokeLinecap="round" strokeLinejoin="round" />
                      </svg> Add Partner
                    </button> )}
                  </div>
                  {validationError.confirm && (
                    <p className="text-red-500 text-xs mb-4" >
                      {validationError.confirm}
                    </p>
                  )}
                  <button
                    onClick={handleConfirmSubmit}
                    disabled={isSubmitting}
                    className={`h-9 rounded-md flex items-center justify-center text-center w-full px-5 text-white text-sm font-medium transition ${isSubmitting ? "bg-[#22A31A]/50 cursor-not-allowed" : "bg-[#124CBE] hover:bg-[#002f8b]"}`}
                    
                  >
                    {isSubmitting ? (
                      <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

KycDetails.displayName = "KycDetails";

