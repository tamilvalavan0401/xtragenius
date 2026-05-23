"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import MDsMessage from "@/components/MDsMessage";

export default function OurMDsMessagePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="border-b border-[#ebebeb] bg-white py-3">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-sm text-[#696969]">
                <Link href="/" className="hover:text-[#ff6600] transition-colors">Home</Link>
                <span className="mx-1">/</span>
                <span>Our MD&apos;s Message</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white pt-10 pb-4 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <AnimateOnScroll delay={0}>
              <h1
                style={{
                  fontSize: "42px",
                  fontWeight: 700,
                  color: "#333333",
                  margin: 0,
                }}
              >
                Our MD&apos;s Message
              </h1>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Extracted Component */}
        <MDsMessage />

      </main>
      <Footer />
    </>
  );
}

