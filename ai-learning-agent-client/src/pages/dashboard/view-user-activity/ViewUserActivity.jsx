import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import {
  FaStar,
  FaRegStar,
  FaEye,
  FaArrowLeft,
  FaUserGraduate,
} from "react-icons/fa";

const ViewUserActivity = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc"); // default: newest first

  const {
    data: activities = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-user-activities"],
    queryFn: async () => {
      const res = await axiosInstance.get("/search-data/all");
      return res.data;
    },
  });

  const handleToggleFavourite = async (id, currentStatus) => {
    try {
      await axiosInstance.patch("/mark-favourite", {
        id,
        favouriteTopic: !currentStatus,
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?"))
      return;

    try {
      await axiosInstance.delete(`/search-data/${id}`);
      refetch();
      if (selectedActivity?._id === id) setSelectedActivity(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter + Sort
  const filteredActivities = activities
    .filter((item) => {
      const term = searchTerm.toLowerCase().trim();
      return (
        item.email?.toLowerCase().includes(term) ||
        item.query?.toLowerCase().includes(term) ||
        item.topicName?.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      const totalA = a.searchData?.questions?.length || 10;
      const totalB = b.searchData?.questions?.length || 10;
      const percentA = Math.round(((a.userScore || 0) / totalA) * 100);
      const percentB = Math.round(((b.userScore || 0) / totalB) * 100);

      switch (sortBy) {
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "marks-asc":
          return percentA - percentB;
        case "marks-desc":
          return percentB - percentA;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ====================== DETAIL VIEW ======================
  if (selectedActivity) {
    const {
      searchData,
      userAnswers = {},
      userScore = 0,
      topicName,
      query,
      favouriteTopic,
      createdAt,
      email,
    } = selectedActivity;

    const totalQuestions = searchData?.questions?.length || 0;
    const percentage = totalQuestions
      ? Math.round((userScore / totalQuestions) * 100)
      : 0;

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedActivity(null)}
          className="btn btn-ghost btn-sm mb-6 gap-2"
        >
          <FaArrowLeft /> Back to Activities
        </button>

        {/* Header Card */}
        <div className="bg-base-100 rounded-2xl border shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{query}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm opacity-70">
                <span>
                  Topic:{" "}
                  <span className="font-medium text-base-content">
                    {topicName}
                  </span>
                </span>
                <span>•</span>
                <span>
                  User:{" "}
                  <span className="font-medium text-base-content">{email}</span>
                </span>
              </div>
              <p className="text-xs opacity-50 mt-1">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() =>
                handleToggleFavourite(selectedActivity._id, favouriteTopic)
              }
              className={`btn btn-sm gap-2 ${
                favouriteTopic ? "btn-warning" : "btn-outline"
              }`}
            >
              {favouriteTopic ? <FaStar /> : <FaRegStar />}
              {favouriteTopic ? "Favourited" : "Favourite"}
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-base-200/60 rounded-xl p-4 text-center">
              <p className="text-xs opacity-60 mb-1">Score</p>
              <p className="text-xl font-bold">
                {userScore}/{totalQuestions}
              </p>
            </div>
            <div className="bg-base-200/60 rounded-xl p-4 text-center">
              <p className="text-xs opacity-60 mb-1">Percentage</p>
              <p className="text-xl font-bold">{percentage}%</p>
            </div>
            <div className="bg-base-200/60 rounded-xl p-4 text-center">
              <p className="text-xs opacity-60 mb-1">Questions</p>
              <p className="text-xl font-bold">{totalQuestions}</p>
            </div>
            <div className="bg-base-200/60 rounded-xl p-4 text-center">
              <p className="text-xs opacity-60 mb-1">Status</p>
              <p
                className={`text-lg font-semibold ${
                  percentage >= 70
                    ? "text-success"
                    : percentage >= 40
                      ? "text-warning"
                      : "text-error"
                }`}
              >
                {percentage >= 70
                  ? "Good"
                  : percentage >= 40
                    ? "Average"
                    : "Needs Practice"}
              </p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <h3 className="text-lg font-semibold mb-4">Question Review</h3>

        <div className="space-y-4">
          {searchData?.questions?.map((q, index) => {
            const userAnswer = userAnswers?.[index];
            const isCorrect = userAnswer === q.correctAnswer;
            const hasAnswer = userAnswer !== undefined && userAnswer !== null;

            return (
              <div
                key={index}
                className={`bg-base-100 rounded-xl border p-5 ${
                  !hasAnswer
                    ? "border-base-300"
                    : isCorrect
                      ? "border-success/40"
                      : "border-error/40"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">
                    <span className="text-primary mr-2">{index + 1}.</span>
                    Question
                  </h4>
                  <span
                    className={`badge badge-sm ${
                      !hasAnswer
                        ? "badge-ghost"
                        : isCorrect
                          ? "badge-success"
                          : "badge-error"
                    }`}
                  >
                    {!hasAnswer
                      ? "Not Answered"
                      : isCorrect
                        ? "Correct"
                        : "Incorrect"}
                  </span>
                </div>

                <p className="font-medium mb-4">{q.question}</p>

                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isUserChoice = option === userAnswer;
                    const isCorrectOption = option === q.correctAnswer;

                    let optionClass = "border border-base-300 bg-base-100";
                    if (isCorrectOption) {
                      optionClass = "border-success bg-success/10";
                    } else if (isUserChoice) {
                      optionClass = "border-error bg-error/10";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-start gap-3 px-4 py-2.5 rounded-lg text-sm ${optionClass}`}
                      >
                        <span className="mt-0.5 shrink-0">
                          {isCorrectOption ? (
                            <span className="text-success font-bold">✓</span>
                          ) : isUserChoice ? (
                            <span className="text-error font-bold">✗</span>
                          ) : (
                            <span className="opacity-30">○</span>
                          )}
                        </span>
                        <span
                          className={
                            isCorrectOption
                              ? "text-success font-medium"
                              : isUserChoice
                                ? "text-error"
                                : ""
                          }
                        >
                          {option}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="mt-4 p-3 bg-info/5 rounded-lg border border-info/20">
                    <p className="text-sm opacity-80">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ====================== LIST VIEW ======================
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaUserGraduate className="text-primary" />
            Users Activity
          </h1>
          <p className="text-sm opacity-60 mt-1">
            {activities.length} quiz attempt{activities.length !== 1 ? "s" : ""}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by email, topic or query..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Sort Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered select-sm w-full max-w-[200px]"
        >
          <option value="date-desc">Date: Newest First</option>
          <option value="date-asc">Date: Oldest First</option>
          <option value="marks-desc">Marks: High to Low</option>
          <option value="marks-asc">Marks: Low to High</option>
        </select>
      </div>

      {/* Empty States */}
      {activities.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <FaUserGraduate className="text-5xl mx-auto mb-4" />
          <p>No activity found yet</p>
        </div>
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <p>No matching activity</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredActivities.map((item) => {
            const total = item.searchData?.questions?.length || 10;
            const percentage = Math.round(
              ((item.userScore || 0) / total) * 100,
            );

            return (
              <div
                key={item._id}
                className="bg-base-100 rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 flex flex-col"
              >
                {/* Top */}
                <div className="flex justify-between items-start gap-2">
                  <span className="badge badge-primary badge-outline badge-sm">
                    {item.topicName}
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        handleToggleFavourite(item._id, item.favouriteTopic)
                      }
                      className="btn btn-ghost btn-xs btn-circle"
                    >
                      {item.favouriteTopic ? (
                        <FaStar className="text-warning" />
                      ) : (
                        <FaRegStar className="opacity-40" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-xs btn-circle text-error"
                    >
                      <RiDeleteBin4Fill className="text-base" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-semibold text-lg mt-3 line-clamp-2">
                  {item.query}
                </h2>

                {/* User */}
                <p className="text-sm opacity-60 mt-1 truncate">{item.email}</p>

                {/* Score + Date */}
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span
                    className={`font-semibold ${
                      percentage >= 70
                        ? "text-success"
                        : percentage >= 40
                          ? "text-warning"
                          : "text-error"
                    }`}
                  >
                    {item.userScore || 0}/{total} ({percentage}%)
                  </span>
                  <span className="opacity-50">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Action */}
                <button
                  onClick={() => setSelectedActivity(item)}
                  className="btn btn-sm btn-primary btn-outline mt-4 w-full gap-2"
                >
                  <FaEye /> View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewUserActivity;
