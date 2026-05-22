"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Newsletters() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative dot-grid — right side */}
      <AnimateOnScroll delay={200} className="absolute right-[100px] top-1/2 -translate-y-1/2 z-0 hidden md:block">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
        >
          <Image
            src="/images/hero-dot.png"
            alt=""
            width={160}
            height={160}
            className="w-[140px] opacity-40"
            priority
          />
        </div>
      </AnimateOnScroll>

      {/* Decorative ring — top-right */}
      <AnimateOnScroll delay={300} className="absolute top-[20px] right-[60px] z-10 hidden md:block">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)` }}
        >
          <Image
            src="/images/hero-round.png"
            alt=""
            width={140}
            height={140}
            className="w-[120px]"
            priority
          />
        </div>
      </AnimateOnScroll>

      {/* Decorative circle stroke — left side */}
      <AnimateOnScroll delay={250} className="absolute left-[80px] top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <div
          className="pointer-events-none transition-transform duration-300 ease-out"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "8px solid #E6DCD2",
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
      </AnimateOnScroll>

      {/* Content */}
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <AnimateOnScroll delay={0}>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 42px)",
              fontWeight: 700,
              color: "#3F3A64",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Subscribe{" "}
            <span style={{ color: "rgb(255, 102, 0)", fontWeight: 700 }}>
              Newsletters
            </span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <p
            style={{
              fontSize: "15px",
              color: "rgb(105, 105, 105)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            Enter your email address to register to our newsletter subscription
            delivered on a regular basis!
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "0",
              maxWidth: "560px",
              margin: "0 auto",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: "16px 20px",
                fontSize: "14px",
                color: "#333",
                backgroundColor: "#f4f4f4",
                border: "none",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "rgb(255, 102, 0)",
                color: "#ffffff",
                padding: "16px 32px",
                fontSize: "14px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.88")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
            >
              Subscribe
            </button>
          </form>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
