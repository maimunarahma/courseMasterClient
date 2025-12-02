  'use client'; 
import { useCourse } from "../context/use-courses";
import CourseHeader from "./courseHeader";
import EnrollButton from "./enrollButton";

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
   <CourseHeader 
  title={course.title} 
  instructor={course.instructor} 
  price={course.price} 
    discountedPrice={course.discountedPrice}
    rating={course.rating}
    students={course.students}
/>

   <div className="mt-10 grid md:grid-cols-3 gap-8">
        {/* Left column: Course content */}
        <div className="md:col-span-2 space-y-8">
          {/* Course Description */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </section>

          {/* What you'll learn */}
          {course.learn && course.learn.length > 0 && (
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">`What you'll learn`</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {course.learn.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Syllabus */}
          {course.syllabus && course.syllabus.length > 0 && (
            <section className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-semibold mb-4">Course Syllabus</h2>
              <ul className="space-y-3">
                {course.syllabus.map((module: any, idx: number) => (
                  <li key={idx} className="border-b border-gray-200 pb-2">
                    <p className="font-medium">{module.title}</p>
                    {module.lessons && (
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-1">
                        {module.lessons.map((lesson: string, lIdx: number) => (
                          <li key={lIdx}>{lesson}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {/* Right column: Enrollment */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white rounded-xl shadow p-6">
            <EnrollButton courseId={course._id} />
          </div>
        </div>
      </div>
     
    </div>
  );
}