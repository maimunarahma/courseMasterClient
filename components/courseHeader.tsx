interface CourseHeaderProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  isLoggedIn?: boolean;
    discountedPrice?: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  title,
  instructor,
  price,
  rating,
  students,
  discountedPrice,
  isLoggedIn = false,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-10">
      {/* Left: Course Info */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-700 mb-2">Instructor: {instructor}</p>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-yellow-500 font-semibold">{rating} ★</span>
          <span className="text-gray-500">{students} students enrolled</span>
        </div>
        <p className="text-gray-600 text-lg">
          Learn everything about {title} in this comprehensive course.
          Perfect for beginners and advanced learners.
        </p>
      </div>

      {/* Right: Enrollment Card */}
      <div className="w-full md:w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500 line-through">${(price * 1.2).toFixed(2)}</span>
        </div>
        <button
          className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
            isLoggedIn ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500"
          }`}
          onClick={() => {
            if (isLoggedIn) alert("Proceed to payment / enroll!");
            else alert("Redirecting to login...");
          }}
        >
          Enroll Now
        </button>
        <ul className="mt-6 text-gray-700 space-y-2">
          <li>✔ Lifetime access</li>
          <li>✔ Certificate of completion</li>
          <li>✔ 30-day money-back guarantee</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseHeader;
