import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const LearningStatistics = () => {
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

  // ===== Calculate statistics =====
  const totalQuizzes = searchInfos.length;

  const totalScore = searchInfos.reduce(
    (sum, item) => sum + (item.userScore || 0),
    0,
  );

  const totalQuestions = searchInfos.reduce(
    (sum, item) => sum + (item.searchData?.questions?.length || 0),
    0,
  );

  const averageScore =
    totalQuizzes > 0 ? (totalScore / totalQuizzes).toFixed(1) : 0;

  const highestScore =
    totalQuizzes > 0
      ? Math.max(...searchInfos.map((item) => item.userScore || 0))
      : 0;

  const favouriteCount = searchInfos.filter(
    (item) => item.favouriteTopic === true,
  ).length;

  // ===== UI =====
  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-6">Learning Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Quizzes */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Total Quizzes</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">
            {totalQuizzes}
          </p>
        </div>

        {/* Average Score */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Average Score</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">
            {averageScore}
          </p>
        </div>

        {/* Highest Score */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Highest Score</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">
            {highestScore}
          </p>
        </div>

        {/* Total Questions */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Total Questions</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">
            {totalQuestions}
          </p>
        </div>

        {/* Favourite Topics */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Favourite Topics</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">
            {favouriteCount}
          </p>
        </div>

        {/* Correct Answers */}
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-gray-500 text-sm">Total Correct Answers</h3>
          <p className="text-3xl font-bold mt-2 text-blue-300">{totalScore}</p>
        </div>
      </div>
    </div>
  );
};

export default LearningStatistics;
