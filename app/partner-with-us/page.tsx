'use client'

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnerWithUs from "@/components/PartnerWithUs";

export default function PartnerWithUsPage() {
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

        {/* Extracted Component */}
        <PartnerWithUs />
        
      </main>
      <Footer />
    </>
  );
}
