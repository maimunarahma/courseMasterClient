  'use client'; 
import { useCourse } from "../context/use-courses";

export  const  CourseDetailWrapper=({ id }: { id: string })=> {
console.log(id)
  const { course, isLoading, isError } = useCourse(id);

  if (isLoading) {
    return <div className="p-10 text-center">Loading course details...</div>;
  }
  
  if (isError || !course) {
    return <div className="p-10 text-center text-red-600">Failed to load course details.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-lg mt-2">Taught by: {course.instructor?.name}</p>
      <p className="mt-4">{course.description}</p>
      {/* Render the full course details here */}
    </div>
  );
}