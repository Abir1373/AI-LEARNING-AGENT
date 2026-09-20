import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";

const FavouriteTopics = () => {
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

  // Only keep favourite items
  const favouriteList = searchInfos.filter(
    (item) => item.favouriteTopic === true,
  );

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-rose-700"></span>
      </div>
    );
  }

  if (favouriteList.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No favourite topics yet.
      </div>
    );
  }

  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaHeart className="text-rose-600" />
        Favourite Topics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favouriteList.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-5 border border-rose-100 hover:shadow-lg transition"
          >
            {/* Topic Name */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.topicName || "No Topic"}
            </h3>

            {/* Query */}
            <p className="text-sm text-gray-500 mb-4">
              {item.query || "No query"}
            </p>

            {/* Score */}
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">
                Score: {item.userScore} /{" "}
                {item.searchData?.questions?.length || 0}
              </span>

              <span className="text-gray-400">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteTopics;
