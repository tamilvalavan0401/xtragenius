"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function VedicMathVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <section className="relative overflow-hidden bg-white py-[150px]">
      <div className="mx-auto w-full max-w-[1350px] px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

          <div className="relative flex-1 w-full max-w-[650px] mx-auto md:ml-12">


            <AnimateOnScroll delay={150} className="absolute -top-14 -left-20 z-0 opacity-80 max-md:hidden">
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#E5C791" version="1.1" width="150px" height="150px" viewBox="0 0 200 202">
                  <path className="elementor-shape-fill" d="M139.374493,198.087515 C155.702187,206.99353 190.724846,197.001323 197.677982,159.049528 C204.827153,120.027728 184.496324,118.997566 188.045232,104.801934 C202.287755,83.6528313 204.827153,56.662651 190.073179,40.4146034 C153.570125,2.39058926 144.444362,48.0194062 114.025151,20.1351292 C101.727304,7.83728238 83.0989526,-6.73517414 56.2286492,3.40456297 C18.2385839,17.7404371 27.3303985,47.659333 27.3303985,69.3128542 C27.3303985,76.9370868 3.11408002,91.2696589 0.460095291,110.885776 C-2.88628833,135.619549 12.6277797,168.175291 27.3303985,179.329002 C50.6517938,205.692318 86.6478605,199.608476 102.87144,190.482713 C116.802125,182.646702 128.220783,192.003673 139.374493,198.087515 Z"></path>
                </svg>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={250} className="absolute top-2 -left-16 z-0 max-md:hidden">
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)` }}
              >
                <Image
                  src="/images/home-around-dot.png"
                  alt="Child learning abacus"
                  width={200}
                  height={200}
                  className="mt-2 md:w-[160px] w-[100px]"
                  priority
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={350} className="absolute -bottom-18 -right-16 z-0 max-md:hidden">
              <div
                className="transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
              >
                <Image
                  src="/images/hero-star.png"
                  alt="Child learning abacus"
                  width={200}
                  height={200}
                  className="mt-2 md:w-[180px] w-[100px]"
                  priority
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={450} className="absolute -right-[100px] -top-[30px] z-0 max-md:hidden">
              <div
                className="w-[80px] h-[80px] rounded-full border-[14px] border-[#ECC5AB] transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
              />
            </AnimateOnScroll>


            <AnimateOnScroll delay={0}>
              <div
                className="relative z-10 w-full aspect-[6/4] rounded-sm shadow-xl overflow-hidden group bg-black cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                {!isPlaying ? (
                  <>
                    <Image
                      src="/images/vedic-math/videoimg.jpg"
                      alt="Vedic Maths course video thumbnail"
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                      {/* Standard YouTube Play Button */}
                      <svg width="68" height="48" viewBox="0 0 68 48">
                        <path
                          className="fill-[#e52d27] transition-colors duration-300 group-hover:fill-[#ff0000]"
                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                        />
                        <path fill="#ffffff" d="M 45,24 27,14 27,34" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1v6Q1_fQ2u8?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </AnimateOnScroll>
          </div>

          <div className="flex-1 w-full max-md:mt-10">
            <AnimateOnScroll delay={150}>
              <h3 className="text-[13px] font-semibold text-[#8c89a2] mb-3 tracking-widest uppercase">
                GET STARTED WITH <span className="text-[#3F3A64]">XTRAGENIUS</span>
              </h3>
              <h2 className="text-[44px] font-bold text-[#3F3A64] leading-[1.2] mb-5">
                Enjoy Our <span className="text-[#ff6600]">Course</span>
              </h2>
              <p className="text-[16px] text-[#696969] leading-[1.8] max-w-[480px]">
                Get a Sneek to peek into the xtragenius Vedic Maths course to know
                what it has in store for you. Encourage your child to be
                remarkable and future-ready with us.
              </p>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
