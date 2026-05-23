'use client'

import { useState } from "react";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter Name", required: true },
  { name: "contact", label: "Contact number", type: "tel", placeholder: "Enter Contact number", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
  { name: "whatsapp", label: "WhatsApp Numbers", type: "tel", placeholder: "Enter WhatsApp Number", required: true },
] as const;

export default function PartnerWithUs() {
  const [form, setForm] = useState({ name: "", contact: "", email: "", whatsapp: "", address: "", pincode: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white pb-20 pt-8">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column - Image */}
          <div className="w-full md:w-1/2">
              <img 
                src="/images/partner-with-us.jpg" 
                alt="Join as a Xtragenius Online Business Partner" 
                className="w-full h-auto"
                onError={(e) => {
                  // Fallback to online image if local doesn't exist
                  (e.target as HTMLImageElement).src = "https://xtragenius.com/wp-content/uploads/2022/05/partner_enquiry.jpg";
                }}
              />
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-1/2">
            {submitted ? (
              <div className="rounded-md p-8 text-center bg-[#f5f7fa]">
                <p className="text-[18px] text-[#3F3A64] font-semibold">
                  Thank you! We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-[15px] font-bold text-[#696969]">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full border border-[#e5e5e5] px-4 py-3 text-[15px] text-[#696969] placeholder-[#a0a0a0] outline-none focus:border-[#ff6600] transition-colors"
                    />
                  </div>
                ))}

                {/* Address textarea */}
                <div>
                  <label className="mb-2 block text-[15px] font-bold text-[#696969]">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[15px] text-[#696969] placeholder-[#a0a0a0] outline-none focus:border-[#ff6600] transition-colors"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="mb-2 block text-[15px] font-bold text-[#696969]">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="w-full border border-[#e5e5e5] px-4 py-3 text-[15px] text-[#696969] placeholder-[#a0a0a0] outline-none focus:border-[#ff6600] transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    className="bg-[#eeeeee] px-8 py-3 text-[15px] font-bold text-[#333333] transition-colors hover:bg-[#ff6600] hover:text-white"
                  >
                    Submit
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
