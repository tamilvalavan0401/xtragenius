import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Culture - Learning made easy",
};

const cultureCards = [
  {
    heading: <>Our <mark>Vision</mark></>,
    text: "Enriching the educational and intellectual skills of the children with advanced concepts such as Vedic Mathematics, Mind Dart, Handwriting along with Abacus training.",
    image: "/images/culture-vision-lightbulb.jpg",
    alt: "Our Vision",
  },
  {
    heading: <>Our <mark>Mission</mark></>,
    text: "To empower every child with essential cognitive and mental arithmetic skills that form the foundation of lifelong learning and academic excellence.",
    image: "/images/culture-mission.jpg",
    alt: "Our Mission",
  },
  {
    heading: <><mark>Our</mark> Values</>,
    text: "We nurture a collaborative and inclusive environment where every learner is respected, encouraged, and supported to reach their fullest potential.",
    image: "/images/culture-values.jpg",
    alt: "Our Values",
  },
  {
    heading: <><mark>Our</mark> Goal</>,
    text: "To expand our reach globally and provide world-class abacus and cognitive skill development programs that are accessible to all children.",
    image: "/images/culture-goal.jpg",
    alt: "Our Goal",
  },
];

const learningSteps = [
  {
    number: "01",
    title: "Quality Standards",
    description: "Always delivered to the same high quality standard.",
  },
  {
    number: "02",
    title: "Support",
    description: "We offer mental arithmetic program to power your brain.",
  },
  {
    number: "03",
    title: "Download",
    description: "About Xtragenius maths courses and its benefits.",
  },
];

export default function OurCulturePage() {
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
                <span>Our Culture</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Our Culture
            </h1>
          </div>
        </section>

        {/* Intro Section */}
        <section className="bg-white pb-8 pt-4">
          <div className="mx-auto max-w-[800px] px-4 text-center">
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#3F3A64",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              Learning <mark>Systems</mark>
            </h2>
            <p style={{ fontSize: "16px", color: "rgb(105, 105, 105)", lineHeight: 1.74 }}>
              We believe every child has his/her unique ways to learn. We help your child to achieve
              a solid foundation in a friendly way. The training we provide assists with your kids in
              upgrading their academic and intellectual skills.
            </p>
          </div>
        </section>

        {/* Vision / Mission / Values / Goal cards */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {cultureCards.map((card, i) => (
                <div key={i} className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                  <div
                    className="relative flex-shrink-0 overflow-hidden rounded-lg"
                    style={{ width: "220px", height: "160px", maxWidth: "100%" }}
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                  <div className="flex-1">
                    <h2
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#3F3A64",
                        lineHeight: 1.2,
                        marginBottom: "12px",
                      }}
                    >
                      {card.heading}
                    </h2>
                    <p style={{ fontSize: "15px", color: "rgb(105, 105, 105)", lineHeight: 1.74, margin: 0 }}>
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Steps — dark navy */}
        <section style={{ backgroundColor: "rgb(37, 26, 108)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
              <div className="flex-shrink-0 md:w-[160px]">
                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "rgb(255, 102, 0)", margin: 0 }}>
                  Learning Steps
                </h3>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
                {learningSteps.map((step) => (
                  <div key={step.number}>
                    <p style={{ fontSize: "36px", fontWeight: 700, color: "rgb(255, 102, 0)", lineHeight: 1, marginBottom: "8px" }}>
                      {step.number}
                    </p>
                    <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* More FAQ link */}
        <section className="bg-white py-12 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <Link
              href="/faqs/"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#3F3A64",
                textDecoration: "none",
              }}
              className="transition-colors hover:text-[#ff6600]"
            >
              More FAQ &raquo;
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
