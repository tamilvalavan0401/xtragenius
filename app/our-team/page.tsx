import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Team - Learning made easy",
};

const steps = [
  {
    tag: "BROADENING",
    number: "#1",
    title: "Career advancement and hobbies",
    description:
      "Studying online gives you more flexibility. You can work and fit your work schedule around your coursework more easily; even more so if you are taking an asynchronous class: an online class where you can study and interact with your instructor and fellow classmates at your own pace.",
    image: "/images/team-step-01.jpg",
  },
  {
    tag: "SCHEDULING",
    number: "#2",
    title: "Flexible schedule & environment",
    description:
      "Taking an online course also means that you don't have to commute to class, which means less time spent on the bus and more study time sitting on your couch. You no longer have to worry about missing an important class!",
    image: "/images/team-step-02.jpg",
  },
  {
    tag: "SELF-DISCIPLINE",
    number: "#3",
    title: "Self-discipline & responsibility",
    description:
      "Who says that having to be more self-disciplined is a disadvantage? It is true that studying online requires more time-management skills, because you will spend a lot of time on your own without someone physically close to keep you focused on deadlines.",
    image: "/images/team-step-03.jpg",
  },
];

export default function OurTeamPage() {
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
                <span>Our Team</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1 style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}>
              Our Team
            </h1>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-white pb-20 pt-4">
          <div className="mx-auto max-w-[1200px] px-4">
            {/* Section heading */}
            <div className="mb-12 text-center">
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
                FOUR MAJOR STEPS TO SUCCESS
              </p>
              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: 700,
                  color: "#3F3A64",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Best chances for expanding your success to the max
              </h2>
            </div>

            {/* Timeline steps */}
            <div className="flex flex-col gap-16">
              {steps.map((step, i) => (
                <div
                  key={step.tag}
                  className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                    i % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-lg" style={{ height: "280px" }}>
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "rgb(255, 102, 0)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "8px",
                      }}
                    >
                      {step.tag}
                    </p>
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "#3F3A64",
                        marginBottom: "12px",
                      }}
                    >
                      {step.number} {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgb(105, 105, 105)",
                        lineHeight: 1.74,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
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
