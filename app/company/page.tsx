import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Company - Learning made easy",
};

const advantageItems = [
  {
    number: "01",
    title: "Meaningful Learning",
    description:
      "We set goals for your children to give them a sense of purpose and focus on a particular direction.",
  },
  {
    number: "02",
    title: "Support",
    description:
      "We have a team of expert teachers that deliver quality teaching for every student.",
  },
  {
    number: "03",
    title: "Download",
    description: "About Xtragenius maths courses and its benefits.",
  },
];

export default function CompanyPage() {
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
                <span>Company</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1
              style={{
                fontSize: "42px",
                fontWeight: 700,
                color: "#333333",
                margin: 0,
              }}
            >
              Company
            </h1>
          </div>
        </section>

        {/* WHAT WE DO / About Xtragenius */}
        <section className="bg-white pb-4 pt-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "rgb(140, 137, 162)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
              }}
            >
              WHAT WE DO ?
            </h3>
            <h2
              style={{
                fontSize: "42px",
                fontWeight: 700,
                color: "#3F3A64",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              About Xtragenius
            </h2>
          </div>
        </section>

        {/* Two-column: Text left, Images right */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
              {/* Left column */}
              <div className="flex-1">
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgb(255, 102, 0)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "12px",
                  }}
                >
                  XTRAGENIUS LEARNING SYSTEM
                </p>
                <h2
                  style={{
                    fontSize: "42px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    lineHeight: 1.2,
                    marginBottom: "24px",
                  }}
                >
                  A Unit Of{" "}
                  <mark>National Educational</mark> Trust
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgb(105, 105, 105)",
                    lineHeight: 1.74,
                    marginBottom: "16px",
                  }}
                >
                  Xtragenius Learning system is the brainchild of our Managing
                  Trustee Mrs, Kavitha Chinnaraj, M.Sc., B.Ed., and M.Phil. The
                  vision of our trust is to spread the wings across the nation
                  and global with advanced concepts like Vedic mathematics,
                  sophisticated memory technique system etc., besides their
                  abacus training program system. We are a fast-growing and
                  professionally managed Educational and intellectual skill
                  development service with an enviable reputation since we
                  launched.
                </p>
              </div>

              {/* Right column: stacked images */}
              <div className="relative flex flex-1 items-center justify-center">
                {/* Decorative circle */}
                <Image
                  src="/images/shape-circle-stroke.png"
                  alt=""
                  width={120}
                  height={120}
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-6 -top-6 z-0 opacity-60 max-md:hidden"
                />
                {/* Main image */}
                <div
                  className="relative z-10 overflow-hidden rounded-lg shadow-md"
                  style={{ width: "340px", height: "240px", maxWidth: "100%" }}
                >
                  <Image
                    src="/images/company-abacus-child.jpg"
                    alt="Child learning abacus"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 340px"
                  />
                </div>
                {/* Secondary image */}
                <div
                  className="absolute bottom-0 right-0 z-20 overflow-hidden rounded-lg shadow-lg max-md:hidden"
                  style={{ width: "180px", height: "130px" }}
                >
                  <Image
                    src="/images/company-math-geometry.jpg"
                    alt="Math education materials"
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                {/* Decorative dots */}
                <Image
                  src="/images/shape-dots.png"
                  alt=""
                  width={120}
                  height={100}
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-4 z-0 opacity-40 max-md:hidden"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Advantage Section */}
        <section style={{ backgroundColor: "rgb(37, 26, 108)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
              {/* Label */}
              <div className="flex-shrink-0 md:w-[160px]">
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "rgb(255, 102, 0)",
                    margin: 0,
                  }}
                >
                  Advantage
                </h3>
              </div>

              {/* Items */}
              <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
                {advantageItems.map((item) => (
                  <div key={item.number}>
                    <p
                      style={{
                        fontSize: "36px",
                        fontWeight: 700,
                        color: "rgb(255, 102, 0)",
                        lineHeight: 1,
                        marginBottom: "8px",
                      }}
                    >
                      {item.number}
                    </p>
                    <h4
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
