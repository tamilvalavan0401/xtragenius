import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const whyUsItems = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3F3A64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="4" />
        <path d="M12 14c-5 0-8 2-8 4v1h16v-1c0-2-3-4-8-4z" />
        <ellipse cx="12" cy="10" rx="8" ry="5" />
        <line x1="2" y1="19" x2="22" y2="19" />
        <path d="M8 19v2M16 19v2" />
        <ellipse cx="12" cy="18" rx="8" ry="3" />
      </svg>
    ),
    title: "Meaningful Learning",
    description:
      "We set goals for your children to give them a sense of purpose and focus on a particular direction.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3F3A64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    ),
    title: "Quality Teaching",
    description:
      "We have a team of expert teachers that they deliver quality teaching for every student.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3F3A64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="10" rx="1" />
        <path d="M7 14v3l3-3" />
        <rect x="9" y="8" width="12" height="8" rx="1" />
        <circle cx="13" cy="12" r="1.5" />
      </svg>
    ),
    title: "One on one support",
    description:
      "We provide one on one support with our Xtragenius teachers for a personalized experience.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3F3A64" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M7 7c0-1.1.9-2 2-2h.5" />
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="M14 10V7.5M14 7.5h2.5M14 7.5L17 4" />
      </svg>
    ),
    title: "Expert guidance",
    description:
      "We provide the support of influential student's minds in education to shape your child's life better.",
  },
];

export default function WhyUs() {
  return (
    <section style={{ backgroundColor: "#f4f4f4", padding: "80px 0" }}>
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <AnimateOnScroll delay={0} className="text-center mb-14">
          <p
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "rgb(255, 102, 0)",
              marginBottom: "12px",
            }}
          >
            Why us ?
          </p>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: 700,
              color: "#3F3A64",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Because we know what it takes to
            <br />
            get the best of your child.
          </h2>
        </AnimateOnScroll>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsItems.map((item, index) => (
            <AnimateOnScroll key={item.title} delay={index * 120}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  padding: "32px 24px 28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#eeeef5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  {item.icon}
                </div>

                <h4
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#3F3A64",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgb(105, 105, 105)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
