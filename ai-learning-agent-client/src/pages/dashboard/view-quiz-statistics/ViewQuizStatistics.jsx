import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import {
  FaChartBar,
  FaUsers,
  FaTrophy,
  FaBookOpen,
  FaStar,
  FaPercentage,
} from "react-icons/fa";

const ViewQuizStatistics = () => {
  const axiosInstance = useAxios();

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ["quiz-statistics"],
    queryFn: async () => {
      const res = await axiosInstance.get("/search-data/all");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ====================== CALCULATIONS ======================
  const totalQuizzes = contents.length;
  const totalUsers = new Set(contents.map((c) => c.email)).size;

  const totalScore = contents.reduce((sum, c) => sum + (c.userScore || 0), 0);
  const totalQuestions = contents.reduce(
    (sum, c) => sum + (c.searchData?.questions?.length || 10),
    0,
  );
  const averagePercentage =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const favouriteCount = contents.filter((c) => c.favouriteTopic).length;

  // Top topics
  const topicCount = {};
  contents.forEach((c) => {
    topicCount[c.topicName] = (topicCount[c.topicName] || 0) + 1;
  });
  const topTopics = Object.entries(topicCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Performance distribution
  const performance = { good: 0, average: 0, poor: 0 };
  contents.forEach((c) => {
    const total = c.searchData?.questions?.length || 10;
    const percent = Math.round(((c.userScore || 0) / total) * 100);
    if (percent >= 70) performance.good++;
    else if (percent >= 40) performance.average++;
    else performance.poor++;
  });

  // Recent activity (last 5)
  const recent = [...contents]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaChartBar className="text-primary" />
          Quiz Statistics
        </h1>
        <p className="text-sm opacity-60 mt-1">
          Overview of all generated quizzes and user performance
        </p>
      </div>

      {/* ========== MAIN STATS ========== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-100 border rounded-2xl shadow-sm">
          <div className="stat-figure text-primary">
            <FaBookOpen className="text-3xl" />
          </div>
          <div className="stat-title">Total Quizzes</div>
          <div className="stat-value text-primary">{totalQuizzes}</div>
        </div>

        <div className="stat bg-base-100 border rounded-2xl shadow-sm">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Active Users</div>
          <div className="stat-value text-secondary">{totalUsers}</div>
        </div>

        <div className="stat bg-base-100 border rounded-2xl shadow-sm">
          <div className="stat-figure text-accent">
            <FaPercentage className="text-3xl" />
          </div>
          <div className="stat-title">Avg. Score</div>
          <div className="stat-value text-accent">{averagePercentage}%</div>
        </div>

        <div className="stat bg-base-100 border rounded-2xl shadow-sm">
          <div className="stat-figure text-warning">
            <FaStar className="text-3xl" />
          </div>
          <div className="stat-title">Favourites</div>
          <div className="stat-value text-warning">{favouriteCount}</div>
        </div>
      </div>

      {/* ========== TWO COLUMN SECTION ========== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Breakdown */}
        <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg mb-5 flex items-center gap-2">
            <FaTrophy className="text-warning" />
            Performance Breakdown
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Good (≥ 70%)</span>
                <span className="font-medium text-success">
                  {performance.good}
                </span>
              </div>
              <progress
                className="progress progress-success w-full"
                value={performance.good}
                max={totalQuizzes || 1}
              ></progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average (40–69%)</span>
                <span className="font-medium text-warning">
                  {performance.average}
                </span>
              </div>
              <progress
                className="progress progress-warning w-full"
                value={performance.average}
                max={totalQuizzes || 1}
              ></progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Needs Practice (&lt; 40%)</span>
                <span className="font-medium text-error">
                  {performance.poor}
                </span>
              </div>
              <progress
                className="progress progress-error w-full"
                value={performance.poor}
                max={totalQuizzes || 1}
              ></progress>
            </div>
          </div>
        </div>

        {/* Top Topics */}
        <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-lg mb-5">Most Popular Topics</h2>

          {topTopics.length === 0 ? (
            <p className="text-sm opacity-50">No data yet</p>
          ) : (
            <div className="space-y-3">
              {topTopics.map(([topic, count], index) => (
                <div
                  key={topic}
                  className="flex items-center justify-between p-3 bg-base-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="badge badge-primary badge-sm">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{topic}</span>
                  </div>
                  <span className="text-sm opacity-70">
                    {count} quiz{count > 1 ? "zes" : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========== RECENT ACTIVITY ========== */}
      <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-5">Recent Quiz Attempts</h2>

        {recent.length === 0 ? (
          <p className="text-sm opacity-50">No recent activity</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Query</th>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((item) => {
                  const total = item.searchData?.questions?.length || 10;
                  const percent = Math.round(
                    ((item.userScore || 0) / total) * 100,
                  );

                  return (
                    <tr key={item._id} className="hover">
                      <td className="text-sm">{item.email}</td>
                      <td className="font-medium max-w-[160px] truncate">
                        {item.query}
                      </td>
                      <td>
                        <span className="badge badge-outline badge-sm">
                          {item.topicName}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`font-medium ${
                            percent >= 70
                              ? "text-success"
                              : percent >= 40
                                ? "text-warning"
                                : "text-error"
                          }`}
                        >
                          {item.userScore}/{total} ({percent}%)
                        </span>
                      </td>
                      <td className="text-sm opacity-60">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQuizStatistics;
