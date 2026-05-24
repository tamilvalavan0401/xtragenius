import Image from "next/image";
import Link from "next/link";
import { Course } from "@/lib/courseData";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="relative w-full h-[200px] overflow-hidden bg-gray-50">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-white">
        <span className="text-[#ff6600] font-bold mb-3">{course.type}</span>
        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-[20px] font-bold text-[#3F3A64] hover:text-[#ff6600] transition-colors line-clamp-2 mb-4">
            {course.title}
          </h3>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
          {course.lessons > 0 && <span>{course.lessons} Lessons</span>}
          {course.students > 0 && <span>{course.students} Student{course.students > 1 ? 's' : ''}</span>}
        </div>
      </div>
    </div>
  );
}
