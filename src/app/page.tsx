
import Image from "next/image";
import AllCoursesGrid from "./courses/page";
import { useCourses } from "../../context/use-courses";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex  w-full w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       <AllCoursesGrid  />
      </main>
    </div>
  );
}
