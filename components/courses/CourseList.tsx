"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/courseData";

export default function CourseList({ courses }: { courses: Course[] }) {
  const [sortOption, setSortOption] = useState("Latest");
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = ["Popularity", "Latest", "Price: low to high", "Price: high to low"];

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <p className="text-gray-500 mb-4 md:mb-0">
          We found <strong className="text-gray-900">{courses.length}</strong> courses available for you
        </p>

        <div className="relative">
          <button 
            className="flex items-center gap-2 bg-[#f8f9fa] border border-gray-100 rounded-md py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-[200px] justify-between"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Sort by: <strong>{sortOption}</strong></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-100 rounded-md shadow-lg z-10 py-2">
              {sortOptions.map(option => (
                <button
                  key={option}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    setSortOption(option);
                    setIsOpen(false);
                  }}
                >
                  {option === sortOption ? (
                    <svg className="text-[#ff6600]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span className="w-[14px]"></span>
                  )}
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
