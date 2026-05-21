import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mind Dart - Learning made easy",
};

export default function MindDartPage() {
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
                <span>Mind Dart</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Mind Dart
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
              {/* Left text */}
              <div className="flex-1">
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    lineHeight: 1.2,
                    marginBottom: "24px",
                  }}
                >
                  The <mark>Right</mark> kind of technique for <mark>Kids</mark>
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgb(105, 105, 105)",
                    lineHeight: 1.74,
                    marginBottom: "16px",
                  }}
                >
                  Our priority is to create a curriculum that generates problem-solving, thinking out of the box and increases the confidence in your children.
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgb(105, 105, 105)",
                    lineHeight: 1.74,
                    marginBottom: "24px",
                  }}
                >
                  Mind Dart is a unique program designed to sharpen children&apos;s mental agility, enhance concentration, and improve memory retention. Through structured exercises and innovative techniques, children develop the ability to process information quickly and accurately, giving them an edge in academics and everyday life.
                </p>
                <Link
                  href="/contact-us/"
                  className="inline-block rounded-[5px] px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgb(255, 102, 0)" }}
                >
                  Enroll Now
                </Link>
              </div>

              {/* Right image */}
              <div className="relative flex-1">
                <div className="relative overflow-hidden rounded-lg shadow-md" style={{ height: "340px" }}>
                  <Image
                    src="/images/mind-dart-kids.jpg"
                    alt="Kids learning Mind Dart techniques"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course highlights */}
        <section style={{ backgroundColor: "rgb(245, 247, 250)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <h2
              className="mb-10 text-center"
              style={{ fontSize: "32px", fontWeight: 700, color: "#3F3A64" }}
            >
              Our Mind Dart Course
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "Mental Agility", desc: "Train the mind to process and respond to information faster through targeted exercises." },
                { title: "Concentration", desc: "Develop sustained focus and attention span that translates to better academic performance." },
                { title: "Memory Enhancement", desc: "Strengthen short-term and long-term memory retention through proven cognitive techniques." },
              ].map((item) => (
                <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#3F3A64", marginBottom: "12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgb(105, 105, 105)", lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
