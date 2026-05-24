export interface Course {
  id: string;
  slug: string;
  title: string;
  type: string; // e.g. "Free"
  lessons: number;
  students: number;
  image: string;
  instructor: string;
  duration: string;
  language: string;
  deadline: string;
  description?: string;
}

export const coursesData: Course[] = [
  {
    id: "1",
    slug: "abacus",
    title: "Abacus",
    type: "Free",
    lessons: 3,
    students: 1,
    image: "",
    instructor: "admin",
    duration: "9 days",
    language: "English",
    deadline: "05 Oct 2019",
  },
  {
    id: "2",
    slug: "personal-finance-financial-security-thinking-principles-2",
    title: "Personal Finance: Financial Security Thinking & Principles",
    type: "Free",
    lessons: 90, // From UI: "90 Students" but missing lessons. I'll just put 0 for lessons and 90 for students to match "90 Students" at bottom.
    students: 90,
    image: "/images/courses/img1.jpg", // Using img1 as requested or just image of guy
    instructor: "admin",
    duration: "9 days",
    language: "English",
    deadline: "05 Oct 2019",
    description: "This course has the ambition to build a bridge between a century of science and 21st-century managers..."
  },
  {
    id: "3",
    slug: "learning-to-write-as-a-professional-author",
    title: "Learning to Write as a Professional Author",
    type: "Free",
    lessons: 20,
    students: 50,
    image: "/images/courses/img2.jpg",
    instructor: "admin",
    duration: "9 days",
    language: "English",
    deadline: "05 Oct 2019",
  }
];

export function getCourseBySlug(slug: string): Course | undefined {
  return coursesData.find(c => c.slug === slug);
}
