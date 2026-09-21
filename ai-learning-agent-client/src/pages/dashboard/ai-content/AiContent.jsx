import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaRobot } from "react-icons/fa";

const AiContent = () => {
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
        No AI content available yet. Complete some quizzes first.
      </div>
    );
  }

  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaRobot className="text-blue-600" />
        AI Content
      </h2>

      <div className="space-y-8">
        {searchInfos.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md border p-6"
          >
            {/* Topic Header */}
            <div className="mb-4 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {item.topicName || "No Topic"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.query || "No query"}
              </p>
            </div>

            {/* AI Explanations */}
            <div className="space-y-4">
              {item.searchData?.questions?.map((q, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-4 border border-blue-100"
                >
                  <p className="font-semibold text-gray-800 mb-2">
                    {index + 1}. {q.question}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-700">
                      AI Explanation:
                    </span>{" "}
                    {q.explanation || "No explanation available"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiContent;
