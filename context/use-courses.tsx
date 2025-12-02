'use client'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCourses( queryString?: string ) {
  console.log("queryString is", queryString);
  const {
    data: courses,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses", queryString],
    queryFn: async () => {
      const res = queryString
        ? await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/search?${queryString}`
          )
        : await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`);
      console.log("res", res?.data);
      return res?.data;
    },
  });
  return {
    courses: courses ? courses : [],
    refetchCarts: refetch,
    isLoading,
    isError,
    error,
  };
}

export function useCourse(id?: string) {
  const {
    data: course,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!id, // avoids calling API with undefined
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`
      );
      console.log(res.data)
      return res.data;
    },
  });

  return {
    course: course || null,
    refetchCourse: refetch,
    isLoading,
    isError,
    error,
  };
}