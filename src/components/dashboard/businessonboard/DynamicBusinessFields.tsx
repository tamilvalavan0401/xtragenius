import * as React from "react";
import { motion } from "framer-motion";
import SvgIcons from "@/components/SvgIcons";

// Define all possible file fields to ensure consistent state initialization
const FILE_FIELDS = [
  "proprietor_pan_file",
  "gst_file",
  "business_pan_file",
  "partnership_deed_file",
  "cin_file",
  "llp_agreement_file",
  "moa_file",
  "aoa_file",
] as const;

type FileField = typeof FILE_FIELDS[number];

interface DynamicBusinessFieldsProps {
  business_type: number;
  step_id: number;
  screen_id: number;
  business_text_details: Record<string, string>;
  business_file_details: Record<string, File | null>;
  partner_details: {
    name: string;
    pan: string;
    panFile: File | null;
    aadhaar: string;
    aadhaarFile: File | null;
    dinNo?: string;
    dinFile?: File | null;
  }[];
  director_details: {
    dinNo: string;
    dinFile: File | null;
    name: string;
    pan: string;
    panFile: File | null;
    aadhaar: string;
    aadhaarFile: File | null;
  }[];
  error: string | null;
  field_errors: Record<string, string[]>;
  setBusinessTextDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setBusinessFileDetails: React.Dispatch<React.SetStateAction<Record<string, File | null>>>;
  setPartnerDetails: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        pan: string;
        panFile: File | null;
        aadhaar: string;
        aadhaarFile: File | null;
        dinNo?: string;
        dinFile?: File | null;
      }[]
    >
  >;
  setDirectorDetails: React.Dispatch<
    React.SetStateAction<
      {
        dinNo: string;
        dinFile: File | null;
        name: string;
        pan: string;
        panFile: File | null;
        aadhaar: string;
        aadhaarFile: File | null;
      }[]
    >
  >;
  // onSubStepComplete: (data: FormData, step: number) => void;
}

export function DynamicBusinessFields({
  business_type,
  step_id,
  screen_id,
  business_text_details,
  business_file_details,
  partner_details,       
  director_details,      
  error,
  field_errors = {},
  setBusinessTextDetails,
  setBusinessFileDetails,
  setPartnerDetails,     
  setDirectorDetails,    
  // onSubStepComplete,
}: DynamicBusinessFieldsProps) {
  const input_base =
    "h-9 w-full rounded-md border bg-white px-3 text-sm text-[#272727] font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent";

  const [sub_step, setSubStep] = React.useState<number>(step_id);
  const [passwords, setPasswords] = React.useState<Record<string, string>>(
    Object.fromEntries(FILE_FIELDS.map((field) => [field, ""]))
  );
  const [is_password_protected, setIsPasswordProtected] = React.useState<
    Record<string, boolean>
  >(Object.fromEntries(FILE_FIELDS.map((field) => [field, false])));
  const [validation_error, setValidationError] = React.useState<
    Record<string, string>
  >(Object.fromEntries(FILE_FIELDS.map((field) => [field, ""])));
  const [is_file_saved, setIsFileSaved] = React.useState<Record<string, boolean>>(
    Object.fromEntries(FILE_FIELDS.map((field) => [field, false]))
  );
  const [is_file_password_saved, setIsFilePasswordSaved] = React.useState<
    Record<string, boolean>
  >(Object.fromEntries(FILE_FIELDS.map((field) => [field, false])));
  const [local_error, setLocalError] = React.useState<string | null>(null);

  const password_input_ref = React.useRef<HTMLInputElement>(null);

React.useEffect(() => {
  setSubStep(step_id);
}, [step_id]);


  React.useEffect(() => {
    if (password_input_ref.current && Object.values(is_password_protected).some((v) => v)) {
      password_input_ref.current.focus();
    }
  }, [is_password_protected]);

  const handleFileRemove = (field: string) => {
    setBusinessFileDetails((s) => ({ ...s, [field]: null }));
    setIsPasswordProtected((s) => ({ ...s, [field]: false }));
    setPasswords((s) => ({ ...s, [field]: "" }));
    setValidationError((s) => ({ ...s, [field]: "" }));
    setIsFileSaved((s) => ({ ...s, [field]: false }));
    setIsFilePasswordSaved((s) => ({ ...s, [field]: false }));
    setBusinessTextDetails((s) => ({ ...s, [`${field}_password`]: "" }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((s) => ({ ...s, [field]: value }));
    setBusinessTextDetails((s) => ({ ...s, [`${field}_password`]: value }));
    if (validation_error[field]) {
      setValidationError((s) => ({ ...s, [field]: "" }));
    }
  };

  const handleUnlockSave = (field: string) => {
    if (!passwords[field] && is_password_protected[field]) {
      setValidationError((s) => ({ ...s, [field]: "Please enter a password for the document." }));
      if (password_input_ref.current) {
        password_input_ref.current.focus();
        password_input_ref.current.className += " border-red-500";
      }
    } else {
      setIsFilePasswordSaved((s) => ({ ...s, [field]: true }));
      // setIsFileSaved((s) => ({ ...s, [field]: true }));
      // setPasswords((s) => ({ ...s, [field]: "" }));
      setValidationError((s) => ({ ...s, [field]: "" }));
    }
  };

  const renderFileUploadSection = (
    field: FileField,
    label: string,
    error_field: string,
    id: string,
    password_field: string
  ) => (
    <div className="mb-[16px]">
      <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px] block">
        {label}
      </label>
      <motion.div
        animate={
          (field_errors[error_field]?.length || validation_error[field]) ? { x: [-10, 10, -10, 10, 0] } : {}
        }
        transition={{ duration: 0.4 }}
      >
        {!business_file_details[field] || is_file_saved[field] ? (
          <>
            <input
              type="file"
              id={id}
              className="hidden"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  setValidationError((s) => ({ ...s, [field]: "File size must be within 5MB." }));
                  return;
                }
                setBusinessFileDetails((s) => ({ ...s, [field]: file || null }));
                setValidationError((s) => ({ ...s, [field]: "" }));
              }}
            />
            <label
              htmlFor={id}
              className={`flex items-center h-[80px] justify-center gap-2 w-full cursor-pointer rounded-lg border-2 border-dashed p-4 text-sm text-[#868EA4]  text-[14px] font-normal hover:bg-gray-50 transition
                ${field_errors[error_field]?.length || validation_error[field] ? "border-red-500 text-red-500" : "border-[#868EA4]"}`}
            >
              <SvgIcons.FileUpload
                className={field_errors[error_field]?.length || validation_error[field] ? "#EF4444" : "#868EA4"}
              />
              <span>Upload File (PDF within 5MB)</span>
            </label>
            {(field_errors[error_field]?.length || validation_error[field]) && (
              <p className="text-red-500 text-xs mt-1" >
                {field_errors[error_field]?.[0] || validation_error[field]}
              </p>
            )}
          </>
        ) : (
          <div className="flex w-full p-3 flex-col justify-center items-start gap-2 rounded-lg bg-[#F4F4F5]">
            <div className="flex justify-between w-full items-center">
              <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[#272727]  text-[14px] font-normal flex items-center gap-1">
                <SvgIcons.Document />
                {business_file_details[field]?.name || `${label} File`}
              </div>
              <span className="text-black cursor-pointer" onClick={() => handleFileRemove(field)}>
                <SvgIcons.PopupClose />
              </span>
            </div>
            <div className="bg-[#EDEDEF] h-[1px] w-full" />
           {!is_file_password_saved[field] && ( <div className="flex items-center gap-1">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={is_password_protected[field] || false}
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
            </div>)}
            {!is_file_password_saved[field] && is_password_protected[field] && (
              <>
                <div className="flex items-center gap-2 w-full">
                  <input
                    ref={password_input_ref}
                    placeholder="Enter document password"
                    className={`flex placeholder:text-[#272727] placeholder: placeholder:text-[14px] placeholder:font-normal h-[36px] w-full px-[12px] py-[8px] items-center gap-[6px] flex-1 rounded-[8px] border border-[#868EA4] bg-white text-[#272727] font-['Plus Jakarta_Sans'] text-[14px] font-normal ${
                      validation_error[field] ? "border-red-500" : ""
                    }`}
                    type="text"
                    value={passwords[field] || ""}
                    onChange={(e) => handlePasswordChange(field, e.target.value)}
                  />
                  <button
                    className="text-[#124CBE] text-center  text-[14px] not-italic font-medium leading-[100%] rounded-[8px] border border-[#124CBE] bg-white flex h-[36px] px-[20px] py-[10px] justify-center items-center gap-[4px]"
                    onClick={() => handleUnlockSave(field)}
                  >
                    Unlock & Save
                  </button>
                </div>
                {validation_error[field] && (
                  <p className="text-red-500 text-xs mt-1" >
                    {validation_error[field]}
                  </p>
                )}
              </>
            )}
            {is_file_password_saved[field] && (
              <p className="text-[#272727]  text-[13px] font-normal">
                Your document has been saved securely.
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );




  const renderTextInput = (
    field: string,
    label: string,
    placeholder: string,
    error_field: string,
    required: boolean = true
  ) => (
    <div className="mb-4">
      <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px] block">
        {label}
      </label>
      <motion.div
        animate={
          (error === `The ${field} field is required.` || local_error === `The ${field} field is required.` || field_errors[error_field]?.length) ? { x: [-10, 10, -10, 10, 0] } : {}
        }
        transition={{ duration: 0.4 }}
      >
        <input
          className={`${input_base} ${
            error === `The ${field} field is required.` || local_error === `The ${field} field is required.` || field_errors[error_field]?.length ? "border-red-500" : "border-[#868EA4]"
          }`}
          placeholder={placeholder}
          value={business_text_details[field] || ""}
          onChange={(e) =>
            setBusinessTextDetails((s) => ({ ...s, [field]: e.target.value }))
          }
          
          required={required}
        />
{(error === `The ${field} field is required.` ||
  local_error === `The ${field} field is required.` ||
  (field_errors[error_field]?.length ?? 0) > 0) && (
  <p className="text-red-500 text-xs mt-1" >
    {field_errors[error_field]?.[0] || error || local_error}
  </p>
)}

      </motion.div>
    </div>
  );

  if (screen_id !== 1) return null;

  if (business_type === 1) {
    if (sub_step === 1) {
      return (
        <div className="">
          {renderTextInput("proprietor_pan", "Proprietor PAN", "Enter PAN", "proprietor_pan")}

        </div>
      );
    } else if (sub_step === 2) {
      return (
        <div className="">
          {renderFileUploadSection(
            "proprietor_pan_file",
            "Proprietor PAN Document",
            "proprietor_pan_file",
            "proprietor-pan-upload",
            "proprietor_pan_file_password"
          )}
          {renderTextInput("tan_no", "TAN Number (optional)", "Enter TAN number", "tan_no", false)}

        </div>
      );
    } else if (sub_step === 3) {
      return (
        <div className="">
          {renderTextInput("gst_no", "GST Number", "Enter GST number", "gst_no")}
 
        </div>
      );
    } else if (sub_step === 4) {
      return (
        <div className="">
          {renderFileUploadSection(
            "gst_file",
            "GST Document",
            "gst_file",
            "gst-upload",
            "gst_file_password"
          )}
          {/* Continue button removed for sub_step 4 */}
        </div>
      );
    }
  }

  if (business_type === 2) {
    if (sub_step === 1) {
      return (
        <div className="">
          {renderTextInput("business_pan", "Business PAN", "Enter PAN", "business_pan")}

        </div>
      );
    } else if (sub_step === 2) {
      return (
        <div className="">
          {renderFileUploadSection(
          "business_pan_file",
          "Business PAN Document",
          "business_pan_file",
          "business-pan-upload",
          "business_pan_file_password" 
            )}
        {renderFileUploadSection(
          "partnership_deed_file",
          "Partnership Deed Document",
          "partnership_deed_file",
          "partnership-deed-upload",
          "partnership_deed_file_password"
        )}
          {renderTextInput("tan_no", "TAN Number (optional)", "Enter TAN number", "tan_no", false)}
        </div>
      );
    } else if (sub_step === 3) {
      return (
        <div className="">
          {renderTextInput("gst_no", "GST Number", "Enter GST number", "gst_no")}

        </div>
      );
    } else if (sub_step === 4) {
      return (
        <div className="">
          {renderFileUploadSection(
            "gst_file",
            "GST Document",
            "gst_file",
            "gst-upload",
            "gst_file_password"
          )}
          {/* Continue button removed for sub_step 4 */}
        </div>
      );
    }
  }

  if (business_type === 3) {
    if (sub_step === 1) {
      return (
        <div className="">
          {renderTextInput("cin_no", "CIN Number", "Enter CIN", "cin_no")}
          {renderTextInput("business_pan", "Business PAN", "Enter PAN", "business_pan")}
        </div>
      );
    } else if (sub_step === 2) {
      return (
        <div className="">
          {renderFileUploadSection(
            "cin_file",
            "CIN Document",
            "cin_file",
            "cin-upload",
            "cin_file_password"
          )}
          {renderFileUploadSection(
            "business_pan_file",
            "Business PAN Document",
            "business_pan_file",
            "business-pan-upload",
            "business_pan_password"
          )}
          {renderFileUploadSection(
            "llp_agreement_file",
            "LLP Agreement Document",
            "llp_agreement_file",
            "llp-agreement-upload",
            "llp_agreement_file_password"
          )}
          {renderTextInput("tan_no", "TAN Number (optional)", "Enter TAN number", "tan_no", false)}

        </div>
      );
    } else if (sub_step === 3) {
      return (
        <div className="">
          {renderTextInput("gst_no", "GST Number", "Enter GST number", "gst_no")}

        </div>
      );
    } else if (sub_step === 4) {
      return (
        <div className="">
          {renderFileUploadSection(
            "gst_file",
            "GST Document",
            "gst_file",
            "gst-upload",
            "gst_file_password"
          )}
          {/* Continue button removed for sub_step 4 */}
        </div>
      );
    }
  }

  if (business_type === 4) {
    if (sub_step === 1) {
      return (
        <div className="">
          {renderTextInput("cin_no", "CIN Number", "Enter CIN", "cin_no")}
          {renderTextInput("business_pan", "Business PAN", "Enter PAN", "business_pan")}

        </div>
      );
    } else if (sub_step === 2) {
      return (
        <div className="">
          {renderFileUploadSection(
            "cin_file",
            "CIN Document",
            "cin_file",
            "cin-upload",
            "cin_file_password"
          )}
          {renderFileUploadSection(
            "business_pan_file",
            "Business PAN Document",
            "business_pan_file",
            "business-pan-upload",
            "business_pan_password"
          )}
          {renderFileUploadSection(
            "moa_file",
            "MOA Document",
            "moa_file",
            "moa-upload",
            "moa_file_password"
          )}
          {renderFileUploadSection(
            "aoa_file",
            "AOA Document",
            "aoa_file",
            "aoa-upload",
            "aoa_file_password"
          )}
          {renderTextInput("tan_no", "TAN Number (optional)", "Enter TAN number", "tan_no", false)}

        </div>
      );
    } else if (sub_step === 3) {
      return (
        <div className="">
          {renderTextInput("gst_no", "GST Number", "Enter GST number", "gst_no")}

        </div>
      );
    } else if (sub_step === 4) {
      return (
        <div className="">
          {renderFileUploadSection(
            "gst_file",
            "GST Document",
            "gst_file",
            "gst-upload",
            "gst_file_password"
          )}
          {/* Continue button removed for sub_step 4 */}
        </div>
      );
    }
  }

  return null;
}

