"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CTASection() {
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
    <section
      style={{
        backgroundColor: "rgb(248, 248, 248)",
        padding: "116px 40px 102px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
     

        <AnimateOnScroll delay={200} className="absolute left-[10px] top-[-50px]">
        <div
          className=""
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "8px solid #E6DCD2",
            pointerEvents: "none",
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="absolute top-[0px] right-[0px] z-10">
        <div 
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
        >
                        <Image
                          src="/images/hero-round.png"
                          alt="Child learning abacus"
                          width={200}
                          height={200}
                          className="mt-2 md:w-[120px] w-[100px]"
                          priority
                        />
                      </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400} className="absolute -bottom-[30px] -left-[20px] z-10">
        <div 
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        >
                        <Image
                          src="/images/threeline.png"
                          alt="Child learning abacus"
                          width={200}
                          height={200}
                          className="mt-2 md:w-[130px] w-[100px]"
                          priority
                        />
                      </div>
        </AnimateOnScroll>

        
        <AnimateOnScroll delay={0}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#3F3A64",
              marginBottom: "12px",
            }}
          >
            Start today for getting{" "}
            <span className="text-[#ff6600] font-[400]">Online Certification</span>
          </h3>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <h2
            style={{
              fontSize: "34px",
              fontWeight: 700,
              color: "#3F3A64",
              lineHeight: 1.3,
              maxWidth: "800px",
              margin: "0 auto 32px",
            }}
          >
            You can be your own guiding star with our help!
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={400}>
          <Link
            href="#"
            style={{
              backgroundColor: "rgb(255, 102, 0)",
              color: "white",
              borderRadius: "5px",
              padding: "14px 48px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-block",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            className="hover:opacity-90"
          >
            Get started now
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
