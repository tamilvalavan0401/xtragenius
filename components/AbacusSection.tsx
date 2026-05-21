import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

const leftListItems: string[] = [
  "Total levels : 8 Levels",
  "Duration per level : 3 months",
];

const rightListItems: string[] = [
  "Enhanced mental arithmetic and problem-solving capabilities.",
  "Superior memory retention and concentration.",
  "Improved academic performance across all math-related subjects.",
  "Positive attitude and confidence in mathematics from an early age.",
];

export default function AbacusSection() {
  return (
    <section
      style={{
        backgroundColor: "rgb(245, 247, 250)",
        padding: "60px 0 70px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {/* Centered heading */}
        <AnimateOnScroll delay={0}>
        <div style={{ textAlign: "center", paddingBottom: "40px" }}>
          <h2
            style={{
              fontFamily: "var(--font-primary), sans-serif",
              fontSize: "34px",
              fontWeight: 700,
              color: "#3F3A64",
              lineHeight: 1.3,
              textAlign: "center",
              margin: 0,
            }}
          >
            Master Math Early: The Transformative Power of Abacus
          </h2>
        </div>
        </AnimateOnScroll>

        {/* Two-column content row */}
        <div
          className="flex flex-col gap-[60px] md:flex-row"
          style={{
            alignItems: "flex-start",
            marginBottom: "40px",
            paddingTop: "15px",
          }}
        >
          {/* Left column */}
          <div className="flex-1">
            <AnimateOnScroll delay={100}>
            <h2
              style={{
                fontFamily: "var(--font-primary), sans-serif",
                fontSize: "48px",
                fontWeight: 700,
                color: "#3F3A64",
                lineHeight: 1.17,
                marginBottom: "24px",
                marginTop: 0,
              }}
            >
              Abacus Mental Arithmetic
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {leftListItems.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "rgb(140, 137, 162)",
                  }}
                >
                  <span
                    style={{
                      color: "rgb(255, 102, 0)",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            </AnimateOnScroll>
          </div>

          {/* Right column */}
          <div className="flex-1">
            <AnimateOnScroll delay={200}>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "rgb(105, 105, 105)",
                lineHeight: 1.74,
                marginBottom: "16px",
                marginTop: 0,
              }}
            >
              The abacus is more than an ancient counting tool- it&apos;s the
              foundation for powerful mental math abilities in children. Children
              who undergo abacus training develop exceptional mental math skills,
              strong number sense, and increased calculation speed without
              relying on calculators.
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "rgb(105, 105, 105)",
                lineHeight: 1.74,
                marginBottom: "12px",
                marginTop: 0,
              }}
            >
              Key benefits of abacus courses for kids include:
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {rightListItems.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "15px",
                    color: "rgb(105, 105, 105)",
                  }}
                >
                  <span
                    style={{
                      color: "rgb(255, 102, 0)",
                      flexShrink: 0,
                    }}
                  >
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            </AnimateOnScroll>
          </div>
        </div>

        
      </div>
      {/* CTA button row */}
        <AnimateOnScroll delay={300}>
        <div style={{ textAlign: "center" }}>
          <Link
            href="/courses"
            className="hover:opacity-90"
            style={{
              display: "inline-block",
              backgroundColor: "rgb(255, 102, 0)",
              color: "white",
              borderRadius: "5px",
              padding: "12px 36px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            View all courses &rarr;
          </Link>
        </div>
        </AnimateOnScroll>
    </section>
  );
}
