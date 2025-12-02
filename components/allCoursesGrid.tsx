"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCourses } from "../context/use-courses";
import { CourseCard } from "./courseCard";
import { cn } from "../lib/utils";

; // optional helper if you have it

// ----- Types -----
export type Course = {
  _id: string;
  title: string;
  slug?: string;
  thumbnail?: string;
  description?: string;
  instructor?: { name: string; photo?: string };
  price?: number;
  discountPrice?: number | null;
  rating?: number;
  students?: number;
  level?: string;
  category?: string;
};


// ----- Component Props -----
export default function AllCoursesGrid({
  
  pageSize = 9,
  showSearch = true,
}: {
  pageSize?: number;
  showSearch?: boolean;
}) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
   const {courses}= useCourses();

  // filter and memoize
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => {
      return (
        c.title.toLowerCase().includes(q) ||
        (c.shortDescription ?? "").toLowerCase().includes(q) ||
        (c.instructor?.name ?? "").toLowerCase().includes(q) ||
        (c.category ?? "").toLowerCase().includes(q)
      );
    });
  }, [courses, query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // handle page reset on query change
  React.useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <section className="w-full">
      {/* Header: Search + stats */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Courses</h2>
          <p className="text-sm text-zinc-500">{total} courses available</p>
        </div>

        {showSearch && (
          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, instructors, categories..."
              className="px-3 py-2 border rounded-md bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Showing {start + 1}-{Math.min(start + pageSize, total)} of {total}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "px-3 py-1 rounded-md border",
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            Prev
          </button>

          <div className="text-sm">
            Page {page} of {totalPages}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              "px-3 py-1 rounded-md border",
              page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}