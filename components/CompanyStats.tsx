"use client";

import { useEffect, useRef, useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

interface StatItem {
  number: number;
  suffix: string;
  label: string;
  highlight?: boolean;
}
 
const stats: StatItem[] = [
  { number: 20, suffix: "", label: " Years Of\nExperience", highlight: true },
  { number: 100, suffix: "+", label: "Franchise\nIn India" },
  { number: 16, suffix: "k", label: "Enrolled\nLearners" },
  { number: 100, suffix: "%", label: "Satisfaction\nRate" },
];

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo for a nice smooth slowdown at the end
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const current = Math.floor(end * easeOut);
      
      if (countRef.current !== current) {
        setCount(current);
        countRef.current = current;
      }
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function CompanyStats() {
  return (
    <section
      style={{
        backgroundColor: "rgb(37, 26, 108)", // Dark blue/purple background
        position: "relative",
        width: "100%",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={index} delay={index * 150} className="w-full">
            <div
              className="group flex flex-col items-center justify-center text-center w-full h-[180px] rounded-lg bg-transparent transition-colors duration-300 ease-in-out hover:bg-[#2d2179] cursor-pointer"
            >
              <div className="flex items-baseline mb-3">
                <span
                  style={{
                    fontSize: "56px",
                    fontWeight: 700,
                    color: "#ff6600",
                    lineHeight: 1,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <AnimatedCounter end={stat.number} duration={2500} />
                </span>
                {stat.suffix && (
                  <span
                    style={{
                      fontSize: "42px",
                      fontWeight: 700,
                      color: "#ff6600",
                      lineHeight: 1,
                      marginLeft: "2px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {stat.label}
              </p>
            </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
