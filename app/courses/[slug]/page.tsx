import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseTabs from "@/components/courses/CourseTabs";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseCard from "@/components/courses/CourseCard";
import { getCourseBySlug, coursesData } from "@/lib/courseData";

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Breadcrumb & Title Section */}
      <section className="bg-white pt-10 ">
        <div className="mx-auto max-w-[1200px] px-4 pb-12">
          <nav className="mb-10">
            <span className="text-sm text-gray-500">
              <a href="/" className="hover:text-[#ff6600] transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href="/courses" className="hover:text-[#ff6600] transition-colors">Courses</a>
              <span className="mx-2">/</span>
              <span>Finance</span>
              <span className="mx-2">/</span>
              <span>{course.title}</span>
            </span>
          </nav>
          <div className="text-center mt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-[#333333] max-w-[800px] mx-auto leading-tight">
              {course.title}
            </h1>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-[#fcfcfc]">
        <div className="mx-auto max-w-[1200px] px-4 flex flex-col lg:flex-row gap-12">
          {/* Main Content (Tabs) */}
          <div className="flex-1 lg:max-w-[750px]">
            <CourseTabs course={course} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[350px]">
            <CourseSidebar course={course} />
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mx-auto max-w-[1200px] px-4 mt-20 pb-16">
          <h2 className="text-2xl font-bold text-center text-[#333333] mb-12">
            Related Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
            {coursesData
              .filter((c) => c.slug !== course.slug)
              .slice(0, 2)
              .map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
