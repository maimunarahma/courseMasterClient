// app/courses/[id]/page.tsx
import { CourseDetailWrapper } from "../../../../components/CourseDetailWrapper";

interface CoursePageProps {
  params: { id: string };
}

export default async function CourseDetailsDynamicPage({ params }: CoursePageProps) {
  // Await params because it's a Promise in App Router
  const resolvedParams = await params;
  const courseId = resolvedParams.id;

  if (!courseId) {
    return (
      <div className="p-10 text-center text-red-600">
        Error: Course ID is missing or invalid.
      </div>
    );
  }

  // You can also fetch the course data here if you want
  // const courseData = await fetchCourseById(courseId);

  return <CourseDetailWrapper id={courseId} />;
}
