import SvgIcons from "@/components/SvgIcons";

export default function TestimonialSection() {
  return (
    <div className="testmonials_bg rounded-xl h-screen md:h-[90vh] max-h-[700px] p-10 hidden md:flex flex-col gap-[20px]  items-center relative">
      {/* Brand Name */}
      <div className="flex justify-center items-center gap-[15px]">
        <SvgIcons.PayQwickLogo/>
         <h2 className=" text-center">
            <span className="text-[#124CBE] text-center text-[24px] font-medium leading-[110%]">Pay</span><span className="text-[#EC9517] text-center text-[24px] font-medium leading-[110%]">Qwick</span>
          </h2>
      </div>
    
    
      {/* Quote Icon */}

      {/* Testimonial Content */}
      <div className=" max-w-md">
        <div className="mb-[32px]">

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 40 32" fill="none">
  <path d="M17.1189 0V9.62238C17.1189 15.6643 15.7016 20.5874 12.8671 24.3916C9.95804 28.2704 5.66899 30.8065 -3.8147e-06 32V24.7273C2.53613 24.1305 4.55011 23.0117 6.04195 21.3706C7.5338 19.8042 8.50349 17.9021 8.95105 15.6643H2.23776V0H17.1189ZM39.7203 0V9.62238C39.7203 15.6643 38.303 20.5874 35.4685 24.3916C32.5594 28.2704 28.3077 30.8065 22.7133 32V24.7273C25.2494 24.1305 27.2634 23.0117 28.7552 21.3706C30.2471 19.8042 31.2168 17.9021 31.6643 15.6643H24.951V0H39.7203Z" fill="#759CE7"/>
</svg>
        </div>

        <p
          className="text-[#002E89] text-xl font-bold leading-[150%] mb-6"
          
        >
          PayQwick has completely streamlined our payment process. Instant payouts have helped us maintain strong
          relationships with our vendors and improve cash flow.
        </p>

        <p
          className="text-[#124CBE] text-sm font-normal leading-[100%]"
          
        >
          PayQwick, Founder 
        </p>
      </div>
    </div>
  )
}

