

import { AuthData } from '@/types/auth';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import TestimonialSection from './testimonial-section';
import axiosInstance, { AK } from '@/api/axiosInstance';
import SvgIcons from '@/components/SvgIcons';

// Fallback JSON data
const fallbackCountries = [
  {"id":1,"country":"India","short_code":"IN","calling_code":91,"phone_length":10,"flag":"in.webp","currency":"INR","currency_symbol":"₹"},
  {"id":2,"country":"Malaysia","short_code":"MY","calling_code":60,"phone_length":10,"flag":"my.webp","currency":"MYR","currency_symbol":"MYR"},
  {"id":3,"country":"Singapore","short_code":"SG","calling_code":65,"phone_length":8,"flag":"sg.webp","currency":"SGD","currency_symbol":"$"},
  {"id":4,"country":"United Arab Emirates","short_code":"AE","calling_code":971,"phone_length":9,"flag":"ae.webp","currency":"AED","currency_symbol":"AED"},
  {"id":5,"country":"United States of America","short_code":"US","calling_code":1,"phone_length":10,"flag":"us.webp","currency":"USD","currency_symbol":"$"},
  {"id":6,"country":"United Kingdom","short_code":"GB","calling_code":44,"phone_length":10,"flag":"gb.webp","currency":"GBP","currency_symbol":"£"},
  {"id":7,"country":"Republic of Indonesia","short_code":"ID","calling_code":62,"phone_length":10,"flag":"id.webp","currency":"IDR","currency_symbol":"Rp"},
  {"id":8,"country":"Brunei","short_code":"BN","calling_code":673,"phone_length":7,"flag":"bn.webp","currency":"BND","currency_symbol":"$"},
  {"id":9,"country":"Canada","short_code":"CA","calling_code":1,"phone_length":10,"flag":"ca.webp","currency":"CAD","currency_symbol":"$"},
  {"id":10,"country":"Australia","short_code":"AU","calling_code":61,"phone_length":9,"flag":"au.webp","currency":"AUD","currency_symbol":"$"}
];

interface Country {
  id: number;
  country: string;
  short_code: string;
  calling_code: number;
  phone_length: number;
  flag: string;
  currency: string;
  currency_symbol: string;
}

interface PersonalDetailsStepProps {
  authData: AuthData;
  updateAuthData: (data: Partial<AuthData>) => void;
  goToStep: (step: 'welcome' | 'verify' | 'personal' | 'password' | 'forgot-password' | 'login') => void;
}

export function PersonalDetailsStep({ authData, updateAuthData, goToStep }: PersonalDetailsStepProps) {
  const [fullName, setFullName] = useState(authData.fullName || '');
  const [mobileNumber, setMobileNumber] = useState(authData.mobileNumber || '');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [errors, setErrors] = useState<{ fullName?: string; mobileNumber?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const fullNameInputRef = useRef<HTMLInputElement>(null); // Ref for fullName input

  // Auto-focus fullName input on mount
  useEffect(() => {
    if (fullNameInputRef.current) {
      fullNameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountries(data.countries);
        const defaultCountry = data.countries.find((c: Country) => c.id === 1) || data.countries[0];
        setSelectedCountry(defaultCountry);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        setCountries(fallbackCountries);
        const defaultCountry = fallbackCountries.find((c) => c.id === 1) || fallbackCountries[0];
        setSelectedCountry(defaultCountry);
        toast.error('Failed to load country data, using default settings', { duration: 4000 });
      }
    };
    fetchCountries();
  }, []);

  const validateFullName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
  };

  const validateMobileNumber = (number: string) => {
    if (!selectedCountry) return false;
    const mobileRegex = new RegExp(`^\\d{${selectedCountry.phone_length}}$`);
    return mobileRegex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; mobileNumber?: string; general?: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!validateFullName(fullName)) {
      newErrors.fullName = 'Please enter a valid name (letters and spaces only, min 2 characters)';
    }

    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(mobileNumber)) {
      newErrors.mobileNumber = `Please enter a valid ${selectedCountry?.phone_length}-digit mobile number`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form', { duration: 4000 });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axiosInstance.post(AK.REGISTER, {
        step: 3,
        email: authData.email,
        name: fullName,
        country_id: selectedCountry?.id || 1,
        mobile: `${selectedCountry?.calling_code}${mobileNumber}`,
      });

      if (response.status >= 200 && response.status < 300) {
        updateAuthData({ fullName, mobileNumber, country_id: selectedCountry?.id });
        goToStep('password');
        toast.success('Personal details saved successfully', { duration: 4000 });
      } else {
        throw new Error(response.data.message || 'Failed to save personal details');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
      // Check if the error is related to mobile number
      if (errorMessage.toLowerCase().includes('mobile') || errorMessage.toLowerCase().includes('phone')) {
        setErrors({ mobileNumber: errorMessage });
      } else {
        setErrors({ general: errorMessage }); // Generic errors go to general
      }
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
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
            className="text-[#272727] text-[24px] md:text-[32px] font-bold leading-[100%] tracking-[-0.64px] mb-[24px]"
            
          >
            Personal Details
          </h2>

          <form className="space-y-[16px]">
            <div>
              <label
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
                
              >
                Full Name (As per PAN)
              </label>
              <motion.div
                animate={errors.fullName ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter Full Name"
                  ref={fullNameInputRef} // Attach ref for auto-focus
                  className={`flex h-10 px-3 py-2 items-center gap-1.5 w-full rounded-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-[#868EA4]'
                  }`}
                  
                  required
                />
                {errors.fullName && (
                  <p
                    className="text-red-500 text-xs mt-1"
                    
                  >
                    {errors.fullName}
                  </p>
                )}
              </motion.div>
            </div>

            <div>
              <label
                className="block text-[#868EA4] text-sm font-normal leading-[100%] mb-2"
                
              >
                Mobile Number
              </label>
              <div className="flex w-full">
                <select
                  value={selectedCountry?.id || ''}
                  onChange={(e) => {
                    const country = countries.find((c) => c.id === Number(e.target.value));
                    setSelectedCountry(country || null);
                    setMobileNumber('');
                    setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                  }}
                  className="flex h-10 px-3 py-2 items-center rounded-l-lg border border-r-0 border-[#868EA4] bg-white text-[#272727] text-sm font-normal leading-[100%] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent"
                  
                >
                  {countries.length > 0 ? (
                    countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        (+{country.calling_code})
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading countries...</option>
                  )}
                </select>
                <motion.div
                  animate={errors.mobileNumber ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative flex-1"
                >
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={`Enter ${selectedCountry?.phone_length || 10}-digit Mobile Number`}
                    className={`flex h-10 px-3 w-full py-2 items-center gap-1.5 flex-1 rounded-r-lg border bg-white text-[#272727] text-sm font-normal leading-[100%] placeholder:text-[#272727] focus:outline-none focus:ring-2 focus:ring-[#124cbe] focus:border-transparent ${
                      errors.mobileNumber ? 'border-red-500' : 'border-[#868EA4]'
                    }`}
                    
                    required
                  />
                  {errors.mobileNumber && (
                    <p
                      className="text-red-500 text-xs mt-1"
                      
                    >
                      {errors.mobileNumber}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>

            {errors.general && (
              <p
                className="text-red-500 text-xs mt-4 text-center"
                
              >
                {errors.general}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`flex h-9 px-5 py-2.5 justify-center items-center gap-1 w-full bg-[#124CBE] hover:bg-[#002f8b] text-white text-center text-sm font-medium leading-[100%] rounded-lg transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              
            >
              {loading ? (
                <Bars
                  visible={true}
                  height="30"
                  width="30"
                  color="#fff"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                'Continue'
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
              </a>
            </span>{' '}
            and{' '}
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

