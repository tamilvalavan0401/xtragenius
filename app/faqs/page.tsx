'use client'

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqItems = [
  {
    question: "How many levels or terms are there for completion of course?",
    answer:
      "There are 8 levels, level 1 to 8, each level span to three months ( one term)",
  },
  {
    question:
      "How many classes are conducted in a month and what is the duration of the class?",
    answer: "The classes are of 2 hours duration in a week.",
  },
  {
    question: "Whether any certificate is issued after completion of a level?",
    answer:
      "Yes; On completion of each level and on conducting an examination, a course completion certificate is issued when a child gets a minimum of 70% marks. The children can go to the next level only after completion of the previous level.",
  },
  {
    question: "How a Franchisee is appointed?",
    answer:
      "A Franchisee is appointed on eligible terms and conditions an executing a Franchise Agreement for an initial period of 3 years on payment of prescribed fee. The Franchisee, after signing the Franchise Agreement, becomes the licensed / authorised to conduct the business of Xtragenius Abacus and Mental Arithmetic Education for younger children of age group 5 to 14 years. The Franchisee can operate up to a maximum distance of 2 to 2.5 km radius.",
  },
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <>
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <section className="border-b border-[#ebebeb] bg-white py-3">
          <div className="mx-auto max-w-[1200px] px-4">
            <nav aria-label="breadcrumb">
              <span className="text-sm text-[#696969]">
                <Link href="/" className="transition-colors hover:text-[#ff6600]">
                  Home
                </Link>
                <span className="mx-1">/</span>
                <span>FAQ&apos;s</span>
              </span>
            </nav>
          </div>
        </section>

        {/* Page Title */}
        <section className="bg-white py-10 text-center">
          <div className="mx-auto max-w-[1200px] px-4">
            <h1
              style={{ fontSize: "42px", fontWeight: 700, color: "#333333", margin: 0 }}
            >
              FAQ&apos;s
            </h1>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white pb-20 pt-10">
          <div className="mx-auto max-w-[800px] px-4">
            {/* Label + Heading */}
            <div className="mb-12 text-center">
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "rgb(140, 137, 162)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                }}
              >
                EVERYTHING <strong style={{ color: "#3F3A64" }}>XTRAGENIUS</strong>
              </p>
              <h2
                style={{
                  fontSize: "42px",
                  fontWeight: 700,
                  color: "#3F3A64",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Frequently asked <mark>Questions</mark>
              </h2>
            </div>

            {/* Accordion */}
            <div className="flex flex-col gap-0">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="border-b border-[#e8e8e8] last:border-b-0"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-5 text-left"
                    onClick={() => toggle(i)}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: openIndex === i ? "rgb(255, 102, 0)" : "#3F3A64",
                      }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="ml-4 flex-shrink-0 text-lg font-bold transition-transform duration-200"
                      style={{
                        color: "rgb(255, 102, 0)",
                        transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="pb-5">
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgb(105, 105, 105)",
                          lineHeight: 1.74,
                          margin: 0,
                        }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
