import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Offline Competition - Learning made easy",
};

const highlights = [
  "Every year, Xtragenius hosts National Level Abacus & Mental Arithmetic Competition. We expect student participation of 3000+ students aged 5 to 13.",
  "After the competition, Awards Distribution Ceremony will be held where over 1000 prizes are going to be given to the top students across each learning level.",
  "The events will have direct live streaming on Facebook and YouTube. Results will be flashed in a big LCD screen in the hall and published on the website.",
];

const stats = [
  { value: "10+", label: "Professional\nCourses" },
  { value: "16k+", label: "Enrolled\nLearners" },
  { value: "500", label: "Franchise\nCentres" },
  { value: "98%", label: "Satisfaction\nRate" },
];

export default function OfflineCompetitionPage() {
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
                <span>Offline Competition</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Offline Competition
            </h1>
          </div>
        </section>

        {/* Main Event Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
              {/* Left */}
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
                  About The Event
                </p>
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    lineHeight: 1.2,
                    marginBottom: "8px",
                  }}
                >
                  23<sup>rd</sup> <mark>National Level</mark> ABACUS &amp; VEDIC MATHS Competition
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgb(255, 102, 0)",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  – 29th December 2019
                </p>
                <p style={{ fontSize: "15px", color: "rgb(105, 105, 105)", lineHeight: 1.74, marginBottom: "16px" }}>
                  We proudly announce that, Our yearly prestigious Abacus Competition is about to begin to discover more talents.
                </p>
                <div className="flex flex-col gap-2">
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#3F3A64" }}>
                    WHERE?&nbsp;&nbsp;<span style={{ color: "rgb(255, 102, 0)" }}>Chennai</span>
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#3F3A64" }}>
                    WHEN?&nbsp;&nbsp;<span style={{ color: "rgb(255, 102, 0)" }}>May 2019</span>
                  </p>
                </div>
              </div>

              {/* Right: Event photo */}
              <div className="relative flex-1">
                <div className="relative overflow-hidden rounded-lg shadow-md" style={{ height: "300px" }}>
                  <Image
                    src="/images/competition-event-2025.jpg"
                    alt="Xtragenius National Competition Event"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About The Event XTRAGENIUS */}
        <section style={{ backgroundColor: "rgb(245, 247, 250)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <h2
              className="mb-6 text-center"
              style={{ fontSize: "32px", fontWeight: 700, color: "#3F3A64" }}
            >
              About The Event <mark>XTRAGENIUS</mark>
            </h2>
            <p
              className="mx-auto text-center"
              style={{ fontSize: "16px", color: "rgb(105, 105, 105)", lineHeight: 1.74, maxWidth: "760px" }}
            >
              The primary focus of this event is to bring all the students of every level on a single National platform and assess their Mental Arithmetic and Brain skills. Thus it provides a healthy competition and also enables indirect quality recognition. The champions and participating students are recognized with certificates, medals, trophies &amp; gifts.
            </p>
          </div>
        </section>

        {/* Event Highlights */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <h2
              className="mb-10 text-center"
              style={{ fontSize: "36px", fontWeight: 700, color: "#3F3A64" }}
            >
              Event <mark>Highlights</mark>
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {highlights.map((text, i) => (
                <div
                  key={i}
                  className="rounded-lg p-6"
                  style={{ backgroundColor: "rgb(245, 247, 250)" }}
                >
                  <p style={{ fontSize: "15px", color: "rgb(105, 105, 105)", lineHeight: 1.74, margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ backgroundColor: "rgb(37, 26, 108)", padding: "50px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.value} className="text-center">
                  <p style={{ fontSize: "48px", fontWeight: 700, color: "rgb(255, 102, 0)", lineHeight: 1, marginBottom: "8px" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Competition */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[800px] px-4 text-center">
            <h2
              className="mb-6"
              style={{ fontSize: "36px", fontWeight: 700, color: "#3F3A64" }}
            >
              Open <mark>Competition</mark>
            </h2>
            <p style={{ fontSize: "16px", color: "rgb(105, 105, 105)", lineHeight: 1.74, marginBottom: "16px" }}>
              Xtragenius invites Abacus Learned Students from various centres across the country eligible to participate in this open competition.
            </p>
            <p style={{ fontSize: "16px", color: "rgb(105, 105, 105)", lineHeight: 1.74, marginBottom: "16px" }}>
              It allows the student to Compete at a Common Platform (National Level) and develop a healthy competitive spirit amongst the students while giving them an opportunity to showcase their talent in the field of Abacus based Mental Arithmetic program.
            </p>
            <p style={{ fontSize: "16px", color: "rgb(105, 105, 105)", lineHeight: 1.74, marginBottom: "32px" }}>
              We cordially invite you to participate in this event &amp; explore your kid&apos;s Arithmetical Calculation Skills.
            </p>
            <div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#3F3A64", marginBottom: "12px" }}>
                For Registration:
              </p>
              <a
                href="tel:+919940633579"
                className="inline-block rounded-[5px] px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ backgroundColor: "rgb(255, 102, 0)" }}
              >
                +91-9940633579
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
