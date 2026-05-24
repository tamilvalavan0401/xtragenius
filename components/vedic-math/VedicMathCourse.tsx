"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimateOnScroll";

export default function VedicMathCourse() {
  return (
    <section className="bg-[#f8f9fa]">
      <div className="mx-auto max-w-[1200px] px-4">

        {/* Section Headings */}
        <div className="text-center mb-16">
          <AnimateOnScroll delay={0}>
            <p className="text-[13px] font-semibold tracking-widest text-[#8c89a2] uppercase mb-3">
              LET YOU KNOW...
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#3F3A64]">
              Our Vedic Maths Course
            </h2>
          </AnimateOnScroll>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-20">

          {/* Left Text */}
          <div className="flex-1 w-full max-w-[400px]">
            <AnimateOnScroll delay={300}>
              <h3 className="text-[32px] font-bold text-[#3F3A64] mb-8">
                Vedic Maths
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#8c89a2] mr-3 text-lg leading-tight">•</span>
                  <span className="text-[#8c89a2] text-[15px]">Total levels : 8 Levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8c89a2] mr-3 text-lg leading-tight">•</span>
                  <span className="text-[#8c89a2] text-[15px]">Duration per level : 3 months</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#8c89a2] mr-3 text-lg leading-tight">•</span>
                  <span className="text-[#8c89a2] text-[15px]">Add subscription fees: RS 9</span>
                </li>
              </ul>
            </AnimateOnScroll>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full">
            <AnimateOnScroll delay={300}>
              <Image
                src="/images/vedic-math/boy.png"
                alt="Vedic Maths Course"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
              />
            </AnimateOnScroll>
          </div>

        </div>

      </div>
    </section>
  );
}
