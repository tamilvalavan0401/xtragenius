import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseList from "@/components/courses/CourseList";
import { coursesData } from "@/lib/courseData";

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Breadcrumb & Title Section */}
      <section className="bg-[#f8f9fa] pt-10 pb-16 border-b border-gray-100">
        <div className="mx-auto max-w-[1200px] px-4">
          <nav className="mb-8">
            <span className="text-sm text-gray-500">
              <a href="/" className="hover:text-[#ff6600] transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span>Courses</span>
            </span>
          </nav>
          <div className="text-center mt-12 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#333333]">
              Archives: Courses
            </h1>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-white pb-20">
        <CourseList courses={coursesData} />
      </main>

      <Footer />
    </div>
  );
}
