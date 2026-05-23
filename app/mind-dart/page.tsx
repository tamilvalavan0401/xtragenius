import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MindDartComponent from "@/components/MindDartComponent";

export const metadata: Metadata = {
  title: "Mind Dart - Xtragenius",
};

export default function MindDartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[80px]">
        {/* Breadcrumb */}
        <section className="border-b border-[#ebebeb] bg-[#f5f7fa] py-3">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-[13px] font-medium text-[#696969] tracking-wide">
                <Link href="/" className="transition-colors hover:text-[#ff6600]">Home</Link>
                <span className="mx-2 text-[#ccc]">›</span>
                <span className="text-[#3F3A64]">Mind Dart</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-12 text-center shadow-sm relative z-10">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 className="text-[42px] font-bold text-[#3F3A64] m-0">
              Mind Dart
            </h1>
          </div>
        </section>
        
        <MindDartComponent />
      </main>

      <Footer />
    </>
  );
}
