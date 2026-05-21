"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function HeroSection() {
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
      <section className="border-b border-[#ebebeb] bg-white py-3">
        <div className="mx-auto max-w-[1200px] px-4">
          <nav aria-label="breadcrumb">
            <span className="text-sm text-[#696969]">Home</span>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white" style={{ minHeight: "600px" }}>
        <div className="mx-auto flex h-full max-w-[1200px] items-center px-4" style={{ minHeight: "600px" }}>
          <div className="flex h-full w-full items-center gap-0 max-md:flex-col max-md:h-auto max-md:py-10">

            {/* Left column – Text content */}
            <div
              className="relative flex flex-1 flex-col justify-center max-md:order-2 max-md:flex-none max-md:w-full"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              

              <AnimateOnScroll delay={0}>
              <h2
                className="font-sans font-bold leading-[1.17] text-[#3f3a64]"
                style={{ fontSize: "48px", width: "460px", maxWidth: "100%" }}
              >
                Welcome to{" "}
                <mark className="bg-transparent text-[#ff6600]">Xtragenius!</mark>
              </h2>
              </AnimateOnScroll>

              <AnimateOnScroll delay={150}>
              <p
                className="font-medium text-[#8c89a2]"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.67",
                  marginTop: "16px",
                  marginBottom: "16px",
                  maxWidth: "460px",
                }}
              >
                We empower young learners to achieve academic success through proven abacus training
                and cognitive skills development. Unlock your child&apos;s math genius with our
                expert-led abacus courses for kids, designed to boost confidence and mental
                arithmetic skills
              </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
              <Link
                href="#"
                className="flex items-center gap-1 font-semibold text-[#8c89a2] transition-colors duration-[250ms] hover:text-[#ff6600]"
                style={{ fontSize: "15px" }}
              >
                Wanna learn more?&nbsp;&nbsp;{" "}
                <span className="font-semibold text-[#ff6600] underline underline-offset-2">
                  Click here
                </span>{" "}
                <span className="text-[#ff6600]">→</span>
              </Link>
              </AnimateOnScroll>
            </div>

            {/* Right column – Hero image with decorations */}
            <div
              className="relative flex flex-1 items-center justify-center max-md:order-1 max-md:flex-none max-md:w-full"
              style={{ minHeight: "580px" }}
            >

              {/* Main circular hero image with subtle border */}
              <AnimateOnScroll delay={200} className="relative z-[2]">
              <div
                className="relative overflow-hidden rounded-full w-[550px] h-[550px] max-md:w-[400px] max-md:h-[400px]"
               
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Child learning abacus"
                  fill
                  className="object-cover object-top w-[300px]"
                  // sizes="(max-width: 768px) 480px, 460px"
                  priority
                />
              </div>
              </AnimateOnScroll>

                {/* Pink/beige circle stroke – bottom-left of image */}
              <AnimateOnScroll delay={350} className="absolute left-0 bottom-0 z-10">
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

              <AnimateOnScroll delay={400} className="absolute top-[120px] left-0 z-0">
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
                <Image
                  src="/images/hero-dot.png"
                  alt="Child learning abacus"
                  width={200}
                  height={200}
                  className="mt-2 w-[130px]"
                  priority
                />
              </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={450} className="absolute bottom-[80px] right-[80px] z-0">
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
              
              <AnimateOnScroll delay={500} className="absolute top-[100px] right-[0px] z-10">
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
      </section>
    </>
  );
}
