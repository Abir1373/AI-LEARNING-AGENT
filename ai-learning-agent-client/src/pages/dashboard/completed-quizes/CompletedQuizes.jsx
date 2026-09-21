import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTrophy } from "react-icons/fa";

const CompletedQuizes = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  const { data: searchInfos = [], isLoading } = useQuery({
    queryKey: ["search-infos", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get("/search-data", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-rose-700"></span>
      </div>
    );
  }

  if (searchInfos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No completed quizzes yet.
      </div>
    );
  }

  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaCheckCircle className="text-green-600" />
        Completed Quizzes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchInfos.map((item) => {
          const totalQuestions = item.searchData?.questions?.length || 0;
          const score = item.userScore || 0;
          const percentage =
            totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

          // Color based on score
          let scoreColor = "text-red-500";
          if (percentage >= 80) scoreColor = "text-green-600";
          else if (percentage >= 50) scoreColor = "text-yellow-500";

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.topicName || "No Topic"}
                </h3>
                {percentage >= 80 && (
                  <FaTrophy className="text-yellow-500 text-xl" />
                )}
              </div>

              {/* Query */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {item.query || "No query"}
              </p>

              {/* Score */}
              <div className="flex justify-between items-center mb-3">
                <span className={`text-2xl font-bold ${scoreColor}`}>
                  {score}/{totalQuestions}
                </span>
                <span className="text-sm text-gray-400">{percentage}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className={`h-2.5 rounded-full ${
                    percentage >= 80
                      ? "bg-green-500"
                      : percentage >= 50
                        ? "bg-yellow-400"
                        : "bg-red-400"
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Date */}
              <p className="text-xs text-gray-400 text-right">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompletedQuizes;
