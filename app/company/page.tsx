"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CompanyCTA from "@/components/CompanyCTA";
import WhyUs from "@/components/WhyUs";
import CompanyStats from "@/components/CompanyStats";
import Newsletters from "@/components/Newsletters";

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the viewport (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
            <AnimateOnScroll delay={0}>
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
            </AnimateOnScroll>
          </div>
        </section>

        {/* WHAT WE DO / About Xtragenius */}
        <section className="bg-white pb-4 pt-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <AnimateOnScroll delay={0}>
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
            </AnimateOnScroll>
          </div>
        </section>

        {/* Two-column: Text left, Images right */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
              {/* Left column */}
              <AnimateOnScroll delay={0} className="md:w-4/12! w-full">
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
              </AnimateOnScroll>

              <div className="relative flex flex-1 md:!w-6/12 w-full items-center justify-center max-md:order-1 max-md:flex-none max-md:w-full"
                style={{ minHeight: "580px" }}>

                {/* Main circular hero image with subtle border */}
                <AnimateOnScroll delay={200} className="relative z-[2]">
                  <div className="relative">
                    <img
                      src="/images/Company/img1.jpg"
                      alt="Child learning abacus"
                      className="max-w-full h-auto rounded-[8px]"
                    />
                    <img
                      src="/images/Company/img2.jpg"
                      alt="Child learning abacus"
                      className="max-w-full h-auto absolute -top-[60px] right-0 rounded-[8px]"
                    />

                  </div>
                </AnimateOnScroll>

                {/* Pink/beige circle stroke – bottom-left of image */}
                <AnimateOnScroll delay={350} className="absolute left-0 top-0 z-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none transition-transform duration-300 ease-out"
                    style={{
                      left: "60px",
                      bottom: "90px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "8px solid #ECC5AB",
                      transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    }}
                  />
                </AnimateOnScroll>

                <AnimateOnScroll delay={400} className="absolute bottom-[80px] left-0 z-0">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}>
                    <Image
                      src="/images/hero-dot.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className=" w-[130px]"
                      priority
                    />
                    {/* <Image
                      src="/images/hero-dot.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 w-[130px]"
                      priority
                    /> */}
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={450} className="absolute top-[50px] right-[160px] z-0">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` }}>
                    <Image
                      src="/images/hero-star.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 w-[130px]"
                      priority
                    />
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={500} className="absolute bottom-[100px] right-[0px] z-10">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}>
                    <Image
                      src="/images/hero-round.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 md:w-[130px] w-[100px]"
                      priority
                    />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">

              <div className="relative flex flex-1 md:!w-6/12 w-full items-center justify-center max-md:order-1 max-md:flex-none max-md:w-full"
                style={{ minHeight: "580px" }}>

                {/* Main circular hero image with subtle border */}
                <AnimateOnScroll delay={200} className="relative z-[2]">
                  <div className="relative">
                    <img
                      src="/images/Company/img3.jpg"
                      alt="Child learning abacus"
                      className="max-w-full h-auto rounded-[8px]"
                    />
                    <img
                      src="/images/Company/img4.jpg"
                      alt="Child learning abacus"
                      className="max-w-full h-auto absolute -top-[60px] right-0 rounded-[8px]"
                    />

                  </div>
                </AnimateOnScroll>

                {/* Pink/beige circle stroke – bottom-left of image */}
                <AnimateOnScroll delay={350} className="absolute left-0 top-0 z-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none transition-transform duration-300 ease-out"
                    style={{
                      left: "60px",
                      bottom: "90px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "8px solid #ECC5AB",
                      transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    }}
                  />
                </AnimateOnScroll>

                <AnimateOnScroll delay={400} className="absolute bottom-[80px] left-0 z-0">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}>
                    <Image
                      src="/images/hero-dot.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className=" w-[130px]"
                      priority
                    />
                    {/* <Image
                      src="/images/hero-dot.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 w-[130px]"
                      priority
                    /> */}
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={450} className="absolute top-[50px] right-[160px] z-0">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` }}>
                    <Image
                      src="/images/hero-star.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 w-[130px]"
                      priority
                    />
                  </div>
                </AnimateOnScroll>

                <AnimateOnScroll delay={500} className="absolute bottom-[100px] right-[0px] z-10">
                  <div className="transition-transform duration-300 ease-out"
                    style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}>
                    <Image
                      src="/images/hero-round.png"
                      alt="Child learning abacus"
                      width={200}
                      height={200}
                      className="mt-2 md:w-[130px] w-[100px]"
                      priority
                    />
                  </div>
                </AnimateOnScroll>
              </div>
              <AnimateOnScroll delay={100} className="md:w-4/12! w-full">
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
                  What We Do ?
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
                  Upgrade {" "}
                  <mark>Skills <br /> Upgrade </mark> Life
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgb(105, 105, 105)",
                    lineHeight: 1.74,
                    marginBottom: "16px",
                  }}
                >
                  We curate programs to encourage kids to be themselves. Xtragenius teaches that skill that is missing to shape your kids’ lives better. We are devoted to our mission to provide complete learning solutions for the overall personality development of the child.
                </p>
              </AnimateOnScroll>


            </div>
          </div>
        </section>

        {/* Advantage Section */}
        <section style={{ backgroundColor: "rgb(37, 26, 108)", padding: "60px 0" }}>
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
              {/* Label */}
              <AnimateOnScroll delay={0} className="flex-shrink-0 md:w-[160px]">
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#FFF",
                    margin: 0,
                  }}
                >
                  Advantage
                </h3>
              </AnimateOnScroll>

              {/* Items */}
              <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
                {advantageItems.map((item, index) => (
                  <AnimateOnScroll key={item.number} delay={index * 150}>
                  <div className="flex items-center gap-4">
                    <div className="flex justify-center  my-auto items-center border-2 border-dashed border-yellow-700 rounded-full p-4 ">
                      <p className="h-[20px] w-[20px] flex justify-center  my-auto items-center"
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "rgb(255, 102, 0)",
                          lineHeight: 1,
                          // marginBottom: "8px",
                        }}
                      >
                        {item.number}
                      </p>
                    </div>
                    <div>
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
                  </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CompanyCTA />

        <WhyUs />
        <CompanyStats/>
        <Newsletters />


      </main>
      <Footer />
    </>
  );
}
