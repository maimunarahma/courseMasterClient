import AllCoursesGrid from "../../../components/allCoursesGrid";

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

export default function CoursesListPage() {
  return <AllCoursesGrid />;
}