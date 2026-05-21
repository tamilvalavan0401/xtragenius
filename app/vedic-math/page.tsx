import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vedic Math - Learning made easy",
};

export default function VedicMathPage() {
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
                <span>Vedic Math</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Vedic Math
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
                  Learn from the leading <mark>Tutors</mark>
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
                  Vedic maths education helps in developing new and innovative methods of mastering calculations. It builds a strong confident arithmetical base and solves the problems easily. Through Vedic maths, one can divide without using a calculator, multiply two decimal numbers together quickly and easily, and square any number ending in 5 within 5 seconds. Well, this all sounds difficult, but it has been proved that by using this phenomenal method and technique one can successfully win over the fear of &ldquo;mathematics&rdquo;.
                </p>
                <Link
                  href="/contact-us/"
                  className="inline-block rounded-[5px] px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgb(255, 102, 0)" }}
                >
                  Enroll Now
                </Link>
              </div>

              {/* Right images */}
              <div className="relative flex flex-1 flex-col gap-4">
                <div className="relative overflow-hidden rounded-lg shadow-md" style={{ height: "280px" }}>
                  <Image
                    src="/images/vedic-math-books.jpg"
                    alt="Vedic Math learning materials"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-md" style={{ maxWidth: "220px" }}>
                  <Image
                    src="/images/vedic-math-poster.png"
                    alt="Vedic Math course"
                    width={220}
                    height={330}
                    className="w-full h-auto"
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
              Our Vedic Maths Course
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "Speed Calculation", desc: "Master techniques to perform calculations at lightning speed without a calculator." },
                { title: "Number Sense", desc: "Develop an intuitive understanding of numbers and their relationships through Vedic sutras." },
                { title: "Confidence Building", desc: "Build mathematical confidence in children so they approach problems fearlessly." },
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
