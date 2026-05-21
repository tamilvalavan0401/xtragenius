import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ONLINE COMPETITION - Learning made easy",
};

export default function OnlineCompetitionPage() {
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
                <span>ONLINE COMPETITION</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              ONLINE COMPETITION
            </h1>
          </div>
        </section>

        {/* Poster Section */}
        <section className="bg-white pb-16 pt-4">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col items-start gap-12 md:flex-row md:items-center">
              {/* Competition poster */}
              <div className="flex justify-center flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg shadow-md" style={{ width: "340px", maxWidth: "100%" }}>
                  <Image
                    src="/images/competition-2025-poster.png"
                    alt="Xtragenius Global Abacus Wiz 2025 Competition"
                    width={340}
                    height={480}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>

              {/* Event details */}
              <div className="flex-1">
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgb(140, 137, 162)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "12px",
                  }}
                >
                  ABOUT THE EVENT
                </p>
                <h2
                  style={{
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    lineHeight: 1.2,
                    marginBottom: "16px",
                  }}
                >
                  XTRAGENIUS GLOBAL ABACUS OLYMPIAD-2025
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "rgb(255, 102, 0)",
                    marginBottom: "20px",
                  }}
                >
                  EXAM DATE: 17/08/2025
                </p>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "14px", color: "rgb(105, 105, 105)" }}>
                      🌐 www.xtragenius.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "14px", color: "rgb(105, 105, 105)" }}>
                      📞 +91 9840004162
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "14px", color: "rgb(105, 105, 105)" }}>
                      ✉️ info@xtragenius.com
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#3F3A64",
                      marginBottom: "12px",
                    }}
                  >
                    For Registration:
                  </p>
                  <a
                    href="tel:+919840004162"
                    className="inline-block rounded-[5px] px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "rgb(255, 102, 0)" }}
                  >
                    +91 9840004162
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Gallery */}
        <section style={{ backgroundColor: "rgb(245, 247, 250)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <h2
              className="mb-10 text-center"
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#3F3A64",
              }}
            >
              XTRAGENIUS EVENT
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg" style={{ height: "260px" }}>
                <Image
                  src="/images/competition-event-2025.jpg"
                  alt="Xtragenius Competition Event 2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg" style={{ height: "260px" }}>
                <Image
                  src="/images/competition-abacus.jpg"
                  alt="Abacus Competition"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
