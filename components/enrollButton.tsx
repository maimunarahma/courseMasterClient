import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";


interface EnrollButtonProps {
  courseId: string;
}

export default function EnrollButton({ courseId }: EnrollButtonProps) {
  const router = useRouter();
  const {isAuthenticated}= useAuth();
  
  const handleEnroll = () => {

    if (isAuthenticated) {
      router.push(`/payment/${courseId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-500 transition"
    >
      Enroll Now
    </button>
  );
}
