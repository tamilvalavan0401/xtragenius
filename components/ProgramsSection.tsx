import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

interface CardItem {
  image: string;
  alt: string;
  title: string;
  cta: string;
  href: string;
}

const cards: CardItem[] = [
  {
    image: "/images/offer/img1.png",
    alt: "Courses",
    title: "Courses",
    cta: "Learn More",
    href: "/courses",
  },
  {
    image: "/images/offer/img2.png",
    alt: "Competition",
    title: "Competition",
    cta: "Learn More",
    href: "/competition",
  },
  {
    image: "/images/offer/img3.png",
    alt: "Shop Toolkits",
    title: "Shop Toolkits",
    cta: "Learn More",
    href: "/shop-4/",
  },
];

export default function ProgramsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <AnimateOnScroll delay={0}>
        <div className="mb-[60px] text-center">
          <h3
            className="mb-2"
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "rgb(255, 102, 0)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Let them dream big
          </h3>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 600,
              color: "rgb(51, 51, 51)",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {"Here's what we offer!"}
          </h2>
        </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
          {cards.map((card, index) => (
            <AnimateOnScroll key={card.href} delay={index * 150} className="h-full w-full">
            <Link
              href={card.href}
              className="group relative block overflow-hidden rounded-md bg-white border-t-4 border-transparent hover:border-[#ff6600] transition-all duration-300 shadow-sm hover:shadow-md"
              style={{ minHeight: "550px", height: "550px" }}
            >
              {/* The title container - transparent normally, white on hover */}
              <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-center h-[80px] bg-transparent group-hover:bg-white transition-colors duration-300">
                <h3 className="font-semibold text-[22px] text-[#333] transition-colors duration-300">
                  {card.title}
                </h3>
              </div>

              {/* The image container - full height, moves down on hover */}
              <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:translate-y-[80px] z-0">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* The overlay button - slides up and fades in on hover */}
              <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[220px] max-w-[90%] flex items-center justify-center gap-2 bg-[#5138ed] hover:bg-[#3d27b5] text-white py-[14px] px-6 rounded-md font-semibold text-[16px] z-10 transition-all duration-500 ease-in-out group-hover:bottom-[40px] opacity-0 group-hover:opacity-100">
                {card.cta} <span className="text-[18px]">→</span>
              </div>
            </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
