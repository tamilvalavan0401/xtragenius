'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import img1 from "@/public/images/threeline.png"
import img2 from "@/public/images/hero-round.png"
import img3 from "@/public/images/Mind-Courese-Img.jpg"

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
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
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const current = Math.floor(end * easeOut);

      if (countRef.current !== current) {
        setCount(current);
        countRef.current = current;
      }
      if (percentage < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function MindDartComponent() {
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

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 overflow-hidden relative">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">

            {/* Left Col */}
            <div className="w-full md:w-5/12 pt-4 relative z-10">
              <AnimateOnScroll delay={0}>
                <h2 className="text-[48px] font-bold text-[#3F3A64] leading-[1.2] mb-6">
                  The <span className="text-[#ff6600]">Right</span> kind of <br /> technique for <span className="text-[#ff6600]">Kids</span>
                </h2>
                <p className="text-[16px] text-[#696969] leading-[1.8] pr-10">
                  Our priority is to create a curriculum that generates problem-solving, thinking out of the box and increases the confidence in your children.
                </p>
              </AnimateOnScroll>
            </div>

            {/* Right Col */}
            <div className="w-full md:w-7/12 relative">
              <AnimateOnScroll delay={100}>
                <div className="relative w-full max-w-[450px] mx-auto">
                  {/* Decorative Elements */}
                  {/* Top-left dots */}
                  <div className="absolute -top-16 -left-16 w-40 h-40 opacity-30 pointer-events-none transition-transform duration-300 ease-out z-0"
                    style={{ backgroundImage: 'radial-gradient(#a3c2c2 2px, transparent 2px)', backgroundSize: '12px 12px', transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)` }}></div>
                  {/* Bottom-right dots */}
                  <div className="absolute -bottom-16 -right-16 w-40 h-40 opacity-30 pointer-events-none transition-transform duration-300 ease-out z-0"
                    style={{ backgroundImage: 'radial-gradient(#a3c2c2 2px, transparent 2px)', backgroundSize: '12px 12px', transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` }}></div>

                  {/* Orange 3/4 circle (top-right) */}
                  <div className="absolute -top-6 -right-10 w-20 h-20 rounded-full border-[6px] border-[#ff6600] border-l-transparent opacity-80 transition-transform duration-300 ease-out z-20"
                    style={{ transform: `rotate(15deg) translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` }}></div>
                  {/* Small circle stroke (bottom-left) */}
                  <div className="absolute bottom-4 -left-12 w-10 h-10 rounded-full border-[4px] border-[#e5a985] opacity-80 transition-transform duration-300 ease-out z-20"
                    style={{ transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)` }}></div>

                  {/* Circular Image */}
                  <div className="relative aspect-square rounded-full overflow-hidden z-10 bg-black shadow-lg">
                    <img
                      src="https://xtragenius.com/wp-content/uploads/elementor/thumbs/boys-with-glasses-write-books-think-classroom_11zon-scaled-pppvrdwzfh6933hr9xcswcd5gkp82v2en2rnzv23es.jpg"
                      alt="Boy with glasses thinking"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://xtragenius.com/wp-content/uploads/elementor/thumbs/boys-with-glasses-write-books-think-classroom_11zon-scaled-pppvrdwzfh6933hr9xcswcd5gkp82v2en2rnzv23es.jpg";
                      }}
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Mind Dart Course Section */}
      <section className="bg-[#f5f7fa] py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center mb-16">
            <AnimateOnScroll delay={0}>
              <h4 className="text-[13px] font-bold text-[#8c89a2] uppercase tracking-[2px] mb-3">LET YOU KNOW...</h4>
              <h2 className="text-[36px] font-bold text-[#3F3A64]">Our Mind Dart Course</h2>
            </AnimateOnScroll>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
            <div className="w-full md:w-5/12 pt-10">
              <AnimateOnScroll delay={100}>
                <h3 className="text-[32px] font-bold text-[#3F3A64] mb-8">Mind Dart</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-[#696969] text-[16px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c89a2] opacity-80"></div>
                    Total levels : 8 Levels
                  </li>
                  <li className="flex items-center gap-4 text-[#696969] text-[16px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c89a2] opacity-80"></div>
                    Duration per level : 3 months
                  </li>
                  <li className="flex items-center gap-4 text-[#696969] text-[16px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8c89a2] opacity-80"></div>
                    Add subscription fees : RS 9
                  </li>
                </ul>
              </AnimateOnScroll>
            </div>

            <div className="w-full md:w-7/12 pt-10">
              <AnimateOnScroll delay={200}>
                <p className="text-[14.5px] text-[#696969] leading-[1.9] text-justify tracking-[0.2px]">
                  Our mind dart memory program makes your mind a bigger place. the general idea of the whole program is to make learning more lively and fun. It gives room for every individual to improve their visualization, imagination and creativity .it is indeed a very effective right and left brain development program. Techniques learned throughout can be directly applied to daily life and school work such as geography, history, science, literature and formulae as well. With these most recent and advanced techniques graduating with a degree before the major age is no more the right of a born genius.
                </p>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#2a2265] py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <AnimateOnScroll delay={0} className="text-center">
              <div className="text-[52px] font-bold text-[#ff6600] leading-none mb-3">
                <AnimatedCounter end={39} />
              </div>
              <div className="text-[15px] font-bold text-white tracking-[0.5px]">Professional<br />Courses</div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100} className="text-center">
              <div className="text-[52px] font-bold text-[#ff6600] leading-none mb-3">
                <AnimatedCounter end={16} />k+
              </div>
              <div className="text-[15px] font-bold text-white tracking-[0.5px]">Enrolled<br />Learners</div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200} className="text-center">
              <div className="text-[52px] font-bold text-[#ff6600] leading-none mb-3">
                <AnimatedCounter end={209} />
              </div>
              <div className="text-[15px] font-bold text-white tracking-[0.5px]">Professional<br />Courses</div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300} className="text-center">
              <div className="text-[52px] font-bold text-[#ff6600] leading-none mb-3">
                <AnimatedCounter end={100} />%
              </div>
              <div className="text-[15px] font-bold text-white tracking-[0.5px]">Satisfaction<br />Rate</div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* Video & Info Section */}
      <section className="bg-white pt-24 pb-32 relative">
        <div className="mx-auto max-w-[1200px] px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            {/* Video Thumbnail */}
            <div className="relative flex-1 w-full max-w-[650px] mx-auto md:ml-0">

              {/* Brown blob top-left */}
              <AnimateOnScroll delay={150} className="absolute -top-14 -left-12 z-0 opacity-80 max-md:hidden">
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#E4CBA1" version="1.1" width="150px" height="150px" viewBox="0 0 200 202">
                    <path className="elementor-shape-fill" d="M139.374493,198.087515 C155.702187,206.99353 190.724846,197.001323 197.677982,159.049528 C204.827153,120.027728 184.496324,118.997566 188.045232,104.801934 C202.287755,83.6528313 204.827153,56.662651 190.073179,40.4146034 C153.570125,2.39058926 144.444362,48.0194062 114.025151,20.1351292 C101.727304,7.83728238 83.0989526,-6.73517414 56.2286492,3.40456297 C18.2385839,17.7404371 27.3303985,47.659333 27.3303985,69.3128542 C27.3303985,76.9370868 3.11408002,91.2696589 0.460095291,110.885776 C-2.88628833,135.619549 12.6277797,168.175291 27.3303985,179.329002 C50.6517938,205.692318 86.6478605,199.608476 102.87144,190.482713 C116.802125,182.646702 128.220783,192.003673 139.374493,198.087515 Z"></path>
                  </svg>
                </div>
              </AnimateOnScroll>

              {/* Dots left */}
              <AnimateOnScroll delay={250} className="absolute top-10 -left-16 z-0 max-md:hidden">
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)` }}
                >
                  <Image
                    src="/images/home-around-dot.png"
                    alt="Dots"
                    width={150}
                    height={150}
                    className="md:w-[130px] w-[100px] opacity-80"
                    priority
                  />
                </div>
              </AnimateOnScroll>

              {/* Plus dots bottom-right */}
              <AnimateOnScroll delay={350} className="absolute -bottom-16 right-0 z-0 max-md:hidden">
                <div
                  className="transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
                >
                  <img src="https://xtragenius.com/wp-content/uploads/2019/12/maxcoach-shape-07.png" alt="" className="w-32 h-32 object-contain opacity-80" />
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0}>
                <div
                  className="relative z-10 w-full aspect-[16/10] rounded-sm shadow-xl overflow-hidden group bg-black cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  {!isPlaying ? (
                    <>
                      <img
                        src="https://xtragenius.com/wp-content/uploads/2019/12/home-2-popup-video-poster.jpg"
                        alt="Mind Dart course video thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://xtragenius.com/wp-content/uploads/2019/12/home-2-popup-video-poster.jpg";
                        }}
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

            {/* Text Content */}
            <div className="flex-1 w-full max-md:mt-10 relative pt-16 pl-4 md:pl-10">
              <AnimateOnScroll delay={450} className="absolute top-0 left-4 md:left-10 z-0 max-md:hidden">
                <div
                  className="w-[70px] h-[70px] rounded-full border-[10px] border-[#E7C6A9] transition-transform duration-200 ease-out"
                  style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
                />
              </AnimateOnScroll>
              
              <AnimateOnScroll delay={150}>
                <h3 className="text-[13px] font-bold text-[#8c89a2] mb-4 tracking-[2px] uppercase">
                  GET STARTED WITH <span className="text-[#3F3A64]">XTRAGENIUS</span>
                </h3>
                <h2 className="text-[36px] font-bold text-[#3F3A64] leading-[1.2] mb-6">
                  Enjoy Our <span className="text-[#ff6600] font-normal">Course</span>
                </h2>
                <p className="text-[16px] text-[#696969] leading-[1.8] mb-4">
                  Get a Sneek to peek into the xtragenius Mind dart course to know
                  what it has in store for you.
                </p>
                <p className="text-[16px] text-[#696969] leading-[1.8]">
                  Encourage your child to be remarkable and future-ready with us.
                </p>
              </AnimateOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                src={img2}
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
                src={img1}
                alt="Child learning abacus"
                width={200}
                height={200}
                className="mt-2 md:w-[130px] w-[100px]"
                priority
              />
            </div>
          </AnimateOnScroll>


          <AnimateOnScroll delay={0}>
            <h3 className="text-[24px] font-bold text-[#3F3A64] mb-3">
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
    </>
  );
}
