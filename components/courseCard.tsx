import { useCourses } from "../context/use-courses";
import Image from "next/image";
import { Course } from "./allCoursesGrid";
import Link from "next/link";
export const CourseCard=({ course }: { course: Course })=> {
  const price = course.discountPrice ?? course.price ?? 0;
  const isFree = (course.price ?? 0) === 0;


  return (
    <article
      aria-labelledby={`course-${course._id}-title`}
      className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <Link href={ `/courses/${course._id}`}>
        <div className="relative h-40 w-full bg-gray-100 dark:bg-zinc-800">
          {course.thumbnail ? (
            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500">No Image</div>
          )}
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            <h3 id={`course-${course._id}-title`} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
              {course?.description ?? "No description available."}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              {course.instructor?.photo ? (
                <Image src={course.instructor.photo} alt={course.instructor.name} width={36} height={36} className="rounded-full" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              )}
              <div className="text-sm">
                <div className="font-medium text-zinc-800 dark:text-zinc-100">{course.instructor?.name ?? "Unknown"}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{course.level ?? "All levels"}</div>
              </div>
            </div>

            <div className="text-right">
              {isFree ? (
                <div className="text-sm font-semibold text-green-600">Free</div>
              ) : (
                <div className="text-sm">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">৳{price}</div>
                  {course.discountPrice && (
                    <div className="text-xs text-zinc-400 line-through">৳{course.price}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
