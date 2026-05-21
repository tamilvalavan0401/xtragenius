'use client'

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    qualification: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
                <Link href="/" className="transition-colors hover:text-[#ff6600]">
                  Home
                </Link>
                <span className="mx-1">/</span>
                <span>Contact us</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[700px] px-4">
            <h2
              className="mb-12 text-center"
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              Get in Touch with us
            </h2>

            {submitted ? (
              <div
                className="rounded-md p-8 text-center"
                style={{ backgroundColor: "rgb(245, 247, 250)" }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    color: "#3F3A64",
                    fontWeight: 600,
                  }}
                >
                  Thank you! We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name row */}
                <div className="mb-5">
                  <label
                    className="mb-1 block text-sm font-medium text-[#333333]"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                      />
                      <span className="mt-1 block text-xs text-[#696969]">First</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                      />
                      <span className="mt-1 block text-xs text-[#696969]">Last</span>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="mb-1 block text-sm font-medium text-[#333333]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                  />
                </div>

                {/* Mobile */}
                <div className="mb-5">
                  <label className="mb-1 block text-sm font-medium text-[#333333]">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                    style={{ maxWidth: "340px" }}
                  />
                </div>

                {/* Qualification */}
                <div className="mb-5">
                  <label className="mb-1 block text-sm font-medium text-[#333333]">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                    style={{ maxWidth: "340px" }}
                  />
                </div>

                {/* Message */}
                <div className="mb-7">
                  <label className="mb-1 block text-sm font-medium text-[#333333]">
                    Comment or Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-[#d0d0d0] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#ff6600]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="border border-[#d0d0d0] bg-white px-6 py-2 text-sm font-medium text-[#333333] transition-colors hover:border-[#ff6600] hover:text-[#ff6600]"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Contact Info Section */}
        <section style={{ backgroundColor: "rgb(245, 247, 250)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    marginBottom: "12px",
                  }}
                >
                  Address
                </h3>
                <p style={{ fontSize: "14px", color: "rgb(105, 105, 105)", lineHeight: 1.7 }}>
                  Xtragenius Learning Systems,<br />
                  No:9/60, Sowrasthra Nagar 10th cross st,<br />
                  Choolaimedu, Chennai - 600 094.
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    marginBottom: "12px",
                  }}
                >
                  Contact
                </h3>
                <p style={{ fontSize: "14px", color: "rgb(105, 105, 105)", lineHeight: 1.7 }}>
                  +91-9940633579<br />
                  9840004161
                </p>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    marginBottom: "12px",
                  }}
                >
                  Hour of operation
                </h3>
                <p style={{ fontSize: "14px", color: "rgb(105, 105, 105)", lineHeight: 1.7 }}>
                  Monday – Saturday<br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
