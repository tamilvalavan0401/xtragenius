import * as React from "react";
import { motion } from "framer-motion";
import SvgIcons from "@/components/SvgIcons";

interface BankFieldsProps {
  step: number;
  screen: number;
  bank: { ac_no: string; ac_ifsc: string; ac_cheque_file: File | null };
  error: string | null;
  fieldErrors: Record<string, string[]>;
  setBank: React.Dispatch<React.SetStateAction<{ ac_no: string; ac_ifsc: string; ac_cheque_file: File | null }>>;
  setBusinessTextDetails: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function BankFields({ step, screen, bank, error, fieldErrors, setBank, setBusinessTextDetails }: BankFieldsProps) {
  const inputBase =
    "h-9 w-full rounded-md border bg-white px-3 text-sm text-[#272727] font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent";
  const fileBase =
    "flex items-center h-[80px] justify-center gap-2 w-full cursor-pointer rounded-lg border-2 border-dashed p-4 text-sm text-[#868EA4]  text-[14px] font-normal hover:bg-gray-50 transition";

  // State for file validation errors and password handling
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [isFileSaved, setIsFileSaved] = React.useState<boolean>(false);
  const [isFilePasswordSaved, setIsFilePasswordSaved] = React.useState<boolean>(false);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  // Log bank state for debugging
  React.useEffect(() => {
    console.log("Bank state in BankFields:", bank);
  }, [bank]);

  // Focus password input when password protection is enabled
  React.useEffect(() => {
    if (passwordInputRef.current && isPasswordProtected) {
      passwordInputRef.current.focus();
    }
  }, [isPasswordProtected]);

  // Handle password change
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setBusinessTextDetails((s) => ({ ...s, ac_cheque_file_password: value }));
    if (validationError) {
      setValidationError(null);
    }
  };

  // Handle unlock and save action
  const handleUnlockSave = () => {
    if (!password && isPasswordProtected) {
      setValidationError("Please enter a password.");
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
        passwordInputRef.current.className += " border-red-500";
      }
    } else {
      setIsFilePasswordSaved(true);
      setIsPasswordProtected(false);
      setIsFileSaved(true);
      setValidationError(null);
    }
  };

  // Handle file removal
  const handleFileRemove = () => {
    setBank((s) => ({ ...s, ac_cheque_file: null }));
    setIsPasswordProtected(false);
    setPassword("");
    setIsFileSaved(false);
    setIsFilePasswordSaved(false);
    setValidationError(null);
    setBusinessTextDetails((s) => ({ ...s, ac_cheque_file_password: "" }));
  };

  if (screen !== 2) return null;

  return (
    <div className="space-y-[16px]">
      {step === 1 && (
        <>
          <div>
            <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
              Account Number
            </label>
            <motion.div
              animate={fieldErrors?.ac_no?.length ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                className={`${inputBase} ${fieldErrors?.ac_no?.length ? "border-red-500" : "border-[#868EA4]"}`}
                placeholder="Enter account number"
                value={bank.ac_no}
                onChange={(e) => {
                  console.log("Updating ac_no:", e.target.value);
                  setBank((s) => ({ ...s, ac_no: e.target.value }));
                }}
                
              />
              {(fieldErrors?.ac_no?.length ?? 0) > 0 && (
                <p className="text-red-500 text-xs mt-1" >
                  {fieldErrors.ac_no?.[0]}
                </p>
              )}
            </motion.div>
          </div>
          <div>
            <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
              IFSC
            </label>
            <motion.div
              animate={fieldErrors?.ac_ifsc?.length ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                className={`${inputBase} ${fieldErrors?.ac_ifsc?.length ? "border-red-500" : "border-[#868EA4]"}`}
                placeholder="Enter IFSC"
                value={bank.ac_ifsc}
                onChange={(e) => {
                  console.log("Updating ac_ifsc:", e.target.value);
                  setBank((s) => ({ ...s, ac_ifsc: e.target.value }));
                }}
                
              />
              {(fieldErrors?.ac_ifsc?.length ?? 0) > 0 && (
                <p className="text-red-500 text-xs mt-1" >
                  {fieldErrors.ac_ifsc?.[0]}
                </p>
              )}
            </motion.div>
          </div>
        </>
      )}
      {step === 2 && (
        <div>
          <label className="text-[#868EA4]  text-[14px] font-normal leading-[14px] mb-[8px]">
            Cheque Document
          </label>
          <motion.div
            animate={(fieldErrors?.ac_cheque_file?.length || validationError) ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {!isFileSaved ? (
              <>
                <input
                  type="file"
                  id="cheque-document-upload"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        setValidationError("File size must be within 5MB.");
                        return;
                      }
                      console.log("Selected cheque file:", file.name);
                      setBank((s) => ({ ...s, ac_cheque_file: file }));
                      setIsFileSaved(true);
                      setValidationError(null);
                    }
                  }}
                />
                <label
                  htmlFor="cheque-document-upload"
                  className={`${fileBase} ${fieldErrors?.ac_cheque_file?.length || validationError ? "border-red-500 text-red-500" : "border-[#868EA4]"}`}
                >
                  <SvgIcons.FileUpload
                    className={fieldErrors?.ac_cheque_file?.length || validationError ? "#EF4444" : "#868EA4"}
                  />
                  <span>Upload Cheque (Image or PDF within 5MB)</span>
                </label>
                {(fieldErrors?.ac_cheque_file?.length || validationError) && (
                  <p className="text-red-500 text-xs mt-1" >
                    {fieldErrors?.ac_cheque_file?.[0] || validationError}
                  </p>
                )}
              </>
            ) : (
              <div className="flex w-full p-3 flex-col justify-center items-start gap-2 rounded-lg bg-[#F4F4F5]">
                <div className="flex justify-between w-full items-center">
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[#272727]  text-[14px] font-normal flex items-center gap-1">
                    <SvgIcons.Document />
                    {bank.ac_cheque_file?.name ?? "Cheque Document"}
                  </div>
                  <span
                    className="text-black cursor-pointer"
                    onClick={handleFileRemove}
                  >
                    <SvgIcons.PopupClose />
                  </span>
                </div>
                <div className="bg-[#EDEDEF] h-[1px] w-full" />
                {!isFilePasswordSaved && (
                  <div className="flex items-center gap-1">
                    <div className="inline-flex items-center">
                      <label className="flex items-center cursor-pointer relative">
                        <input
                          type="checkbox"
                          checked={isPasswordProtected}
                          onChange={(e) => setIsPasswordProtected(e.target.checked)}
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
                {!isFilePasswordSaved && isPasswordProtected && (
                  <>
                    <div className="flex items-center gap-2 w-full">
                      <input
                        ref={passwordInputRef}
                        placeholder="Enter document password"
                        className={`flex placeholder:text-[#272727] placeholder: placeholder:text-[14px] placeholder:font-normal h-[36px] w-full px-[12px] py-[8px] items-center gap-[6px] flex-1 rounded-[8px] border border-[#868EA4] bg-white text-[#272727]  text-[14px] font-normal ${validationError ? "border-red-500" : ""}`}
                        type="password"
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                      />
                      <button
                        className="flex h-[36px] px-[20px] py-[10px] justify-center items-center gap-[4px] rounded-[8px] border border-[#124CBE] bg-white text-[#124CBE] text-center  text-[14px] font-medium"
                        onClick={handleUnlockSave}
                      >
                        Unlock & Save
                      </button>
                    </div>
                    {validationError && (
                      <p className="text-red-500 text-xs mt-1" >
                        {validationError}
                      </p>
                    )}
                  </>
                )}
                {isFilePasswordSaved && (
                  <p className="text-[#272727]  text-[13px] font-normal">
                    Your document has been saved securely.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

