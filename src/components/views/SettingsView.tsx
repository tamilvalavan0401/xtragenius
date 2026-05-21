import SvgIcons from '@/components/SvgIcons';
import ReportsTable from '@/components/tables/ReportsTable';
import axiosInstance, { AK } from '@/api/axiosInstance';
import { Close, ToastClose } from '@radix-ui/react-toast';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner'; // Ensure this is imported for the loading spinner

export const SettingsView = () => {
  const [enabled, setEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('My Account');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false); // Toggle for old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const requirements = [
    { text: 'Must be at least 8 characters', met: newPassword.length >= 8 },
    { text: 'Must include lowercase letter', met: /[a-z]/.test(newPassword) },
    { text: 'Must include uppercase letter', met: /[A-Z]/.test(newPassword) },
    { text: 'Must include a number', met: /[0-9]/.test(newPassword) },
    { text: 'Must include special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) return 'Must include at least 8 characters';
    if (!hasAlphabet) return 'Must include at least 1 alphabet';
    if (!hasNumber) return 'Must include at least 1 number';
    if (!hasSpecialChar) return 'Must include at least 1 special character';
    return '';
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    const error = validatePassword(newPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setLoading(true);
    setPasswordError('');
    setServerErrors([]);

    try {
      const payload = {
        old_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };

      const response = await axiosInstance.post(AK.CHANGE_PASSWORD, payload);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Password changed successfully', { duration: 4000 });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordPopup(false);
      } else {
        throw new Error(response.data.message || 'Failed to change password');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
      const serverValidationErrors = error.response?.data?.errors || [];
      setPasswordError(errorMessage);
      setServerErrors(serverValidationErrors);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 container mx-auto">
      <div className="px-[16px] py-[24px] bg-white rounded-[8px] w-full">
        <div>
          <h1 className="text-[#272727] mb-[16px] font-[Plus Jakarta Sans] text-xl font-bold leading-[20px]">Settings</h1>
          <p className="text-[#272727]  text-[14px] font-normal leading-[14px] opacity-[0.8]">
            Your control center for payments, compliance, and more.
          </p>
        </div>
      </div>
      <div className="mt-[12px] rounded-[8px] bg-white py-[16px]">
        <div className="flex items-center cursor-pointer">
          <div
            className={`flex border-b-2 items-center gap-[8px] p-[8px]  text-[14px] font-medium ${
              activeTab === 'My Account' ? 'border-b-[#284292] text-[#284292]' : 'border-b-transparent border-b-2 text-[#272727]'
            }`}
            onClick={() => setActiveTab('My Account')}
          >
            <SvgIcons.SettingsUser className={activeTab === 'My Account' ? 'text-[#284292]' : 'text-[#272727]'} /> My Account
          </div>
          <div
            className={`flex items-center gap-[8px]  text-[14px] font-medium p-[8px] ${
              activeTab === 'Security' ? 'border-b-2 border-b-[#284292] text-[#284292]' : 'border-b-transparent border-b-2 text-[#272727]'
            }`}
            onClick={() => setActiveTab('Security')}
          >
            <SvgIcons.SettingsLock className={activeTab === 'Security' ? 'text-[#284292]' : 'text-[#272727]'} /> Security
          </div>
        </div>

        {activeTab === 'My Account' && (
          <div className="px-[16px]">
            <div className="my-[24px]">
              <p className="text-[#626C89]  text-[14px] font-normal">Avatar</p>
              <div className="relative w-fit">
                <div className="text-[#A27D1B] flex items-center justify-center  text-[32px] font-semibold w-[60px] h-[60px] aspect-square bg-[#F8ECCC] rounded-full">
                  PQ
                </div>
                <span className="w-[24px] absolute bottom-0 rounded-full right-0 h-[24px] p-[4px] bg-white">
                  <SvgIcons.ProfileCamera />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:gap-[40px] md:gap-[20px] gap-[16px] md:grid-cols-3 lg:grid-cols-5">
              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  Name
                </label>
                <input
                  className="flex h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch w-full rounded-[4px] border border-[#EBEBEB] bg-white text-[#272727]  text-[14px] font-normal leading-[100%]"
                  type="text"
                  name=""
                  id=""
                />
              </div>

              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  Mobile
                </label>
                <div className="relative">
                  <input
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    type="text"
                    placeholder="+91 000XXX000"
                    name=""
                    id=""
                  />
                  <span className="absolute top-[10px] right-3">
                    <SvgIcons.VerifySuccess />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  Email
                </label>
                <div className="relative">
                  <input
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    type="text"
                    placeholder="test@mail.com"
                    name=""
                    id=""
                  />
                  <span className="absolute top-[10px] right-3">
                    <SvgIcons.VerifySuccess />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  Aadhaar
                </label>
                <div className="relative">
                  <input
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    type="text"
                    name=""
                    placeholder="xxxx xxxx xxxx"
                    id=""
                  />
                  <span className="absolute top-[10px] right-3">
                    <SvgIcons.VerifySuccess />
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  PAN
                </label>
                <div className="relative">
                  <input
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    type="text"
                    placeholder="xxxx xxxx xxxx"
                    name=""
                    id=""
                  />
                  <span className="absolute top-[10px] right-3">
                    <SvgIcons.VerifySuccess />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full my-[24px] h-[0.8px] bg-[#EBEBEB]" />

            <div>
              <div className="flex items-center gap-[8px]">
                <p className="text-[#272727] mb-[12px]  text-[14px] font-medium">KYC Status</p>
                <p className="flex items-center justify-center gap-[10px] px-[4px] py-[2px] rounded-[2px] bg-[#DAFED7] text-[#284292]  text-[12px] font-normal">
                  Verified
                </p>
              </div>
              <p className="text-black  text-[12px] font-normal opacity-[0.6]">
                Complete your KYC to enable payouts, higher limits, and full compliance with RBI guidelines.
              </p>
            </div>

            <div className="flex justify-end mt-11">
              <button className="inline-flex h-9 px-4 py-2 justify-center items-center gap-2 shrink-0 rounded bg-[#124CBE] text-white  text-[14px] font-medium leading-[15px]">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="px-[16px] mt-[24px]">
            <div className="flex items-center gap-[8px]">
              <div>
                <label htmlFor="" className="text-[#626C89]  text-[14px] font-normal mb-[8px]">
                  Password
                </label>
                <div className="relative w-fit">
                  <input
                    className="flex h-[36px] px-[12px] py-[8px] items-center w-full gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    type="text"
                    placeholder="xxxxxxxx"
                    name=""
                    disabled
                    id=""
                  />
                  <span className="absolute top-[10px] right-3">
                    <SvgIcons.VerifySuccess />
                  </span>
                  <span className="text-black  text-[12px] font-normal opacity-[0.6]">
                    Keep your account secure with a strong password
                  </span>
                </div>
              </div>
              <button
                className="inline-flex h-9 px-4 py-2 justify-center items-center gap-2 shrink-0 rounded bg-[#124CBE] text-white  text-[14px] font-medium leading-[15px]"
                onClick={() => setShowPasswordPopup(true)}
              >
                Change
              </button>
            </div>

            <div className="w-full my-[24px] h-[0.8px] bg-[#EBEBEB]" />

            <div>
              <div className="flex items-center gap-[8px]">
                <p className="text-[#272727] mb-[12px]  text-[14px] font-medium">
                  Two Factor Authentication
                </p>
              </div>
              <p className="text-black  text-[12px] font-normal opacity-[0.6]">
                Secure your FincePay account with a one-time code sent via SMS, email, or authenticator app.
              </p>
            </div>

            <div className="flex justify-end mt-11">
              <div className="relative inline-block w-11 h-5">
                <input
                  id="switch-component"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-[#124CBE] cursor-pointer transition-colors duration-300"
                />
                <label
                  htmlFor="switch-component"
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-[#18970C] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center px-4 md:px-0 justify-center z-50">
          <div className="bg-white p-6 relative rounded-[8px] w-full md:w-[350px]">
            <button className="absolute right-3 top-2 text-black" onClick={() => setShowPasswordPopup(false)}>
              <SvgIcons.PopupClose />
            </button>
            <div className="space-y-4">
              <div>
                <label className="text-[#626C89] mb-[8px]  text-[14px] font-normal">
                  Old Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <SvgIcons.PasswordOpen /> : <SvgIcons.PasswordHide />}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-[#626C89]  text-[14px] font-normal">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <SvgIcons.PasswordOpen /> : <SvgIcons.PasswordHide />}
                  </span>
                  <div className="space-y-2 mt-2">
                    {serverErrors.length > 0 ? (
                      serverErrors.map((err, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              d="M11 0L4 8L1 5"
                              stroke={req.met ? '#124CBE' : '#868EA4'}
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span
                            className={`text-sm ${req.met ? 'text-[#124CBE]' : 'text-[#868EA4]'}`}
                            
                          >
                            {req.text}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  {passwordError && <p className="text-red-500 text-[12px]">{passwordError}</p>}
                </div>
              </div>
              <div>
                <label className="text-[#626C89]  text-[14px] font-normal">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="flex w-full h-[36px] px-[12px] py-[8px] items-center gap-[6px] self-stretch rounded-[4px] border border-[#EBEBEB] bg-[#F4F5F7] text-[#272727]  text-[14px] font-normal leading-[100%]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="cursor-pointer absolute top-2 right-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <SvgIcons.PasswordOpen /> : <SvgIcons.PasswordHide />}
                  </span>
                </div>
              </div>
              <button
                className="flex w-full h-[36px] px-[16px] py-[8px] justify-center items-center gap-[8px] rounded-[4px] bg-[#124CBE] text-white  text-[14px] font-medium leading-[15px]"
                onClick={handlePasswordChange}
                disabled={loading}
              >
                {loading ? (
                  <Bars height="20" width="20" color="#fff" ariaLabel="bars-loading" visible={true} />
                ) : (
                  'Change Password'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

