"use client";

import { useState } from "react";
import Image from "next/image";
import { Course } from "@/lib/courseData";

const tabs = ["Overview", "Curriculum", "Instructor", "Reviews"];

export default function CourseTabs({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="w-full">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-4 px-6 font-medium text-[16px] transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab
                ? "border-[#ff6600] text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="relative min-h-[400px]">
        {/* Overview Tab */}
        <div
          className={`transition-all duration-500 ease-out w-full ${
            activeTab === "Overview"
              ? "relative opacity-100 translate-y-0 pointer-events-auto"
              : "absolute top-0 left-0 opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {course.slug === "abacus" ? (
            <div className="text-gray-600 space-y-6 leading-relaxed">
              <h3 className="text-xl font-bold text-[#3F3A64] mb-2">Meaningful Learning</h3>
              <p>We set goals for your children to give them a sense of purpose and focus on a particular direction.</p>
              
              <h3 className="text-xl font-bold text-[#3F3A64] mb-2">Quality Teaching</h3>
              <p>We have a team of expert teachers that they deliver quality teaching for every student.</p>
              
              <h3 className="text-xl font-bold text-[#3F3A64] mb-2">One on one support</h3>
              <p>We provide one on one support with our Xtragenius teachers for a personalized experience.</p>
              
              <h3 className="text-xl font-bold text-[#3F3A64] mb-2">Expert guidance</h3>
              <p>We provide the support of influential student's minds in education to shape your child's life better.</p>
              
              <div className="mt-8 flex justify-center lg:justify-start">
                <Image src="/images/courses/img2.jpg" alt="Abacus Event" width={400} height={250} className="rounded-lg object-cover" />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#3F3A64] mb-6">Course Description</h2>
              <div className="text-gray-600 space-y-6 leading-relaxed">
                <p>
                  {course.description || "This course has the ambition to build a bridge between a century of science and 21st-century managers. A bridge between how our brain works and how to use that knowledge to improve our communication and leadership abilities."}
                </p>
                <p>
                  To understand how and why Leadership works, we first need to understand what triggers us. We'll be diving deep into our subconscious motivational processes. We'll have a look at our brain, call it our 'hardware' and the subconscious programs running in it, that's basically our software.
                </p>
                <p>
                  So expect tools, concrete, and simple tools that you will be able to use right away with your team and colleagues. In the end, the aim of this course is to open the way for a new understanding of motivation and communication, towards a new, highly effective and sustainable model for leadership in this 21st century.
                </p>
              </div>
              
              <div className="mt-10 relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/courses/img1.jpg" // Using placeholder image for video thumb
                  alt="Course Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-10 text-gray-600 space-y-6 leading-relaxed">
                <p>I will provide a framework based on the latest insights in cognitive psychology and related fields. Within this framework, I will present your studies, research, and experiments on human behavior and I will show you how they apply to leadership and team management.</p>
                <p>Who this course is for:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Managers in charge of a team</li>
                    <li>Managers looking for tools and insights to manage their team</li>
                    <li>Professionals who want to improve their people skills</li>
                    <li>Professionals who want to learn more about human behavior</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Curriculum Tab */}
        <div
          className={`transition-all duration-500 ease-out w-full ${
            activeTab === "Curriculum"
              ? "relative opacity-100 translate-y-0 pointer-events-auto"
              : "absolute top-0 left-0 opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-6 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-bold text-lg text-[#3F3A64]">Section 1</h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  <span className="text-sm font-medium">Lesson 1</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-sm font-medium">Quiz 1</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#e0f2fe] text-[#0284c7] text-xs px-2 py-1 rounded">2 questions</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span className="text-sm font-medium">Quiz 2</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-[#e0f2fe] text-[#0284c7] text-xs px-2 py-1 rounded">1 question</span>
                  <span className="bg-[#ffedd5] text-[#ea580c] text-xs px-2 py-1 rounded">10 minutes</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Tab */}
        <div
          className={`transition-all duration-500 ease-out w-full ${
            activeTab === "Instructor"
              ? "relative opacity-100 translate-y-0 pointer-events-auto"
              : "absolute top-0 left-0 opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="flex gap-8 items-start">
            <div className="w-[150px] h-[150px] bg-gray-200 rounded-md overflow-hidden flex-shrink-0 relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                 <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#3F3A64] mb-2">{course.instructor}</h3>
            </div>
          </div>
        </div>

        {/* Reviews Tab */}
        <div
          className={`transition-all duration-500 ease-out w-full ${
            activeTab === "Reviews"
              ? "relative opacity-100 translate-y-0 pointer-events-auto"
              : "absolute top-0 left-0 opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <h2 className="text-2xl font-bold text-[#3F3A64] mb-8">Reviews</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.05)] p-8 text-center w-full md:w-[200px] flex-shrink-0">
              <h3 className="text-sm font-medium text-gray-500 mb-4 text-left">Average Rating</h3>
              <div className="text-6xl font-bold text-[#ff6600] mb-4">0</div>
              <div className="flex justify-center text-gray-300 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <div className="text-sm text-gray-500">(0 rating)</div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Detailed Rating</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex text-[#ffcc00]">
                      {[1, 2, 3, 4, 5].map(star => (
                         <svg key={star} className={star <= stars ? "text-[#ffcc00] fill-current" : "text-gray-300"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-[#ffcc00] w-0"></div>
                    </div>
                    <div className="text-sm text-gray-500 w-4">0</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
