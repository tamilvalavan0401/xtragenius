'use client'

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter Name", required: true },
  { name: "contact", label: "Contact number", type: "tel", placeholder: "Enter Contact number", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
  { name: "whatsapp", label: "WhatsApp Numbers", type: "tel", placeholder: "Enter WhatsApp Number", required: true },
  { name: "pincode", label: "Pincode", type: "text", placeholder: "Pincode", required: true },
] as const;

export default function PartnerWithUsPage() {
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
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="border-b border-[#ebebeb] bg-white py-3">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-sm text-[#696969]">
                <Link href="/" className="transition-colors hover:text-[#ff6600]">Home</Link>
                <span className="mx-1">/</span>
                <span>Partner With Us</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Partner With Us
            </h1>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white pb-20 pt-8">
          <div className="mx-auto max-w-[600px] px-4">
            {submitted ? (
              <div className="rounded-md p-8 text-center" style={{ backgroundColor: "rgb(245, 247, 250)" }}>
                <p style={{ fontSize: "18px", color: "#3F3A64", fontWeight: 600 }}>
                  Thank you! We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="mb-1 block text-sm font-medium text-[#333333]">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                    />
                  </div>
                ))}

                {/* Address textarea */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#333333]">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="border border-[#d0d0d0] bg-white px-6 py-2 text-sm font-medium text-[#333333] transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
