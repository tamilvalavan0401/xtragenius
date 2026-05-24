import { Course } from "@/lib/courseData";

export default function CourseSidebar({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.05)] p-8 sticky top-24">
      <ul className="space-y-6">
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
            <span className="text-sm">Price</span>
          </div>
          <span className="text-[#ff6600] font-bold text-xl">{course.type}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <span className="text-sm">Instructor</span>
          </div>
          <span className="text-gray-900 text-sm">{course.instructor}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            <span className="text-sm">Duration</span>
          </div>
          <span className="text-gray-900 text-sm">{course.duration}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <span className="text-sm">Enrolled</span>
          </div>
          <span className="text-gray-900 text-sm">{course.students} students</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
            <span className="text-sm">Language</span>
          </div>
          <span className="text-gray-900 text-sm">{course.language}</span>
        </li>
        <li className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
            <span className="text-sm">Deadline</span>
          </div>
          <span className="text-gray-900 text-sm">{course.deadline}</span>
        </li>
      </ul>

      <div className="mt-8 ">
        <button className="w-full bg-[#ff6600] hover:bg-[#e65c00] text-white font-semibold py-4 rounded-md transition-colors relative z-10">
          Start Now
        </button>


        <div className="relative group">
          {/* Social Sharing Popup */}
          <div className="absolute left-0 right-0 bottom-full mb-1 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20 flex justify-center">
            <div className="bg-white border border-gray-100 text-gray-400 rounded-md py-3 px-6 shadow-lg flex items-center gap-6 relative">
              {/* Tooltip Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-white drop-shadow-sm"></div>

              <div className="relative group/tooltip flex justify-center">
                <a href="#" className="hover:text-[#ff6600] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <div className="absolute -top-10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-[#ff6600] text-white text-xs py-1 px-2 rounded font-medium shadow-md pointer-events-none whitespace-nowrap">
                  Facebook
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ff6600]"></div>
                </div>
              </div>
              <div className="relative group/tooltip flex justify-center">
                <a href="#" className="hover:text-[#ff6600] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <div className="absolute -top-10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-[#ff6600] text-white text-xs py-1 px-2 rounded font-medium shadow-md pointer-events-none whitespace-nowrap">
                  Twitter
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ff6600]"></div>
                </div>
              </div>
              <div className="relative group/tooltip flex justify-center">
                <a href="#" className="hover:text-[#ff6600] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <div className="absolute -top-10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-[#ff6600] text-white text-xs py-1 px-2 rounded font-medium shadow-md pointer-events-none whitespace-nowrap">
                  Linked In
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ff6600]"></div>
                </div>
              </div>
              <div className="relative group/tooltip flex justify-center">
                <a href="#" className="hover:text-[#ff6600] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648h2.416V2.224h3.814v4.424h3.818v3.099h-3.818v7.185c0 1.28.511 2.138 2.186 2.138h1.564v4.331c-1.125.46-2.825.6-4.533.6z" /></svg>
                </a>
                <div className="absolute -top-10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-[#ff6600] text-white text-xs py-1 px-2 rounded font-medium shadow-md pointer-events-none whitespace-nowrap">
                  Tumblr
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#ff6600]"></div>
                </div>
              </div>

            </div>
          </div>

          <button className="w-full mt-4 text-[#ff6600] border border-[#ff6600] font-semibold py-3 flex items-center justify-center gap-2 hover:bg-orange-50 rounded-md transition-colors relative z-10">
            Share this course
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
