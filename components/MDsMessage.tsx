import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function MDsMessage() {
  return (
    <>
      {/* Top Header Section with Curve */}
      <section className="bg-white relative pt-8 pb-16">
        <div className="mx-auto max-w-[1200px] px-4 text-center relative z-10">
          <AnimateOnScroll delay={0}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#696969",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              Success story
            </h3>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#3F3A64",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              The biggest turning point in my life: <br />
              Wonderful choice.
            </h2>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SVG Curve Divider */}
      <div className="w-full overflow-hidden leading-none -mt-16 bg-[#fcfcfc]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-[60px] md:h-[120px]"
          style={{ fill: "white" }}
        >
          <path d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Main Content Section */}
      <section className="bg-[#fcfcfc] pb-16 pt-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            
            {/* Image Column */}
            <AnimateOnScroll delay={100} className="w-full md:w-5/12">
              <div className="relative overflow-hidden rounded-[8px]">
                <img
                  src="https://xtragenius.com/wp-content/uploads/2022/05/IMG_7821.jpeg"
                  alt="MD's Message"
                  className="w-full h-auto object-cover rounded-[8px]"
                />
              </div>
            </AnimateOnScroll>

            {/* Text Column */}
            <AnimateOnScroll delay={200} className="w-full md:w-7/12 pt-4">
              <div className="text-[#696969] space-y-6 text-[15px] leading-[1.8]">
                <p>
                  At Xtragenius, we put ourselves in learners&apos; shoes to understand what they want and need, to build handy options for their education and guide them to a better version of themselves. We do the hard work to pave the ways for innovative higher education with advanced delivery modalities.
                </p>
                <p>
                  Thank you for taking the time to visit our website. If you are interested in helping the children of India significantly develop their mental potential, do read on. John F Kennedy once said &quot;Children are the most valuable resource in this world and the best hope for the future&quot; and we at SIP Academy truly believe that only if we empower our children would we have a better world tomorrow. By enriching and empowering young children with essential mental skills, we would be able to ensure that although &quot;we cannot build the future for our children, we can build our children for the future&quot;.
                </p>
              </div>

              <div className="mt-10 pl-6">
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#3F3A64",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  I learned one thing about online <br/> education is that <mark className="bg-transparent text-[#ff6600] p-0 font-bold">highly</mark> <br/> <mark className="bg-transparent text-[#ff6600] p-0 font-bold">motivated individuals</mark> always <br/> find a way to tackle the <br/> challenge in the most creative <br/> and flexible way.
                </h3>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ / Info Section (2 Column Layout) */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-4 space-y-16">
          
          <AnimateOnScroll delay={100}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Question */}
              <div className="w-full md:w-4/12 flex gap-4">
                <div className="text-[#ff6600] mt-1 text-[18px]">
                  <i className="fas fa-arrow-right"></i>
                </div>
                <h3 className="text-[17px] font-bold text-[#3F3A64] leading-[1.6] m-0">
                  What are the reasons for learners to choose distant learning (e-learning) over the traditional method?
                </h3>
              </div>
              
              {/* Answer */}
              <div className="w-full md:w-8/12 pl-8 md:pl-0">
                <ul className="space-y-6">
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div><strong>FLEXIBILITY</strong> – Work, family, degree—it’s all possible.</div>
                  </li>
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>Convenience – Study on your time schedule, no commute, stackable programs lead to certificates and degrees.</div>
                  </li>
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>Proven Modality – More than 5 million students take one or more distance education courses each year.</div>
                  </li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="w-full h-px bg-[#eee] my-10"></div>

          <AnimateOnScroll delay={100}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Question */}
              <div className="w-full md:w-4/12 flex gap-4">
                <div className="text-[#ff6600] mt-1 text-[18px]">
                  <i className="fas fa-arrow-right"></i>
                </div>
                <h3 className="text-[17px] font-bold text-[#3F3A64] leading-[1.6] m-0">
                  What makes Xtragenius different from others? Is that the equipment or the tutor?
                </h3>
              </div>
              
              {/* Answer */}
              <div className="w-full md:w-8/12 pl-8 md:pl-0">
                <ul className="space-y-6">
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>New Relationships and Networking Opportunities – Learn alongside students who offer diverse levels of experience and perspective. Students enroll from all corners of the world contributing to a rich classroom environment.</div>
                  </li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="w-full h-px bg-[#eee] my-10"></div>

          <AnimateOnScroll delay={100}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Question */}
              <div className="w-full md:w-4/12 flex gap-4">
                <div className="text-[#ff6600] mt-1 text-[18px]">
                  <i className="fas fa-arrow-right"></i>
                </div>
                <h3 className="text-[17px] font-bold text-[#3F3A64] leading-[1.6] m-0">
                  Which kind of opportunities is opened up to me when I take the lead?
                </h3>
              </div>
              
              {/* Answer */}
              <div className="w-full md:w-8/12 pl-8 md:pl-0">
                <ul className="space-y-6">
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>Career Advancement and Entrepreneurial Opportunities – Advance your career with additional credentials or degrees.</div>
                  </li>
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>Quality of Instruction – University of Illinois faculty are among the most accomplished scholars in the world.</div>
                  </li>
                  <li className="flex gap-4 text-[#696969] text-[15px] leading-[1.7]">
                    <div className="text-[#ff6600] mt-1 shrink-0"><i className="fas fa-check"></i></div>
                    <div>Academic Excellence – Online degree seekers earn the same degree as U of I campus-based degree seeking students.</div>
                  </li>
                </ul>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </section>
    </>
  );
}
