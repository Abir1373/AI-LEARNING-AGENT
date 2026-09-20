import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";

const RecentActivity = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  const {
    data: searchInfos = [],
    isLoading: infoLoading,
    refetch,
  } = useQuery({
    queryKey: ["search-infos", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get("/search-data", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  // Toggle favourite
  const handleFavourite = async (currentStatus, id) => {
    const res = await axiosInstance.patch("/mark-favourite", {
      id: id,
      favouriteTopic: !currentStatus,
    });
    console.log(res.data);
    refetch();
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/search-data/${id}`);
    console.log(res.data);
    refetch();
  };

  if (loading || infoLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-rose-700"></span>
      </div>
    );
  }

  if (searchInfos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No recent activity found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto m-6">
      <table className="table">
        <thead className="text-lg text-center">
          <tr>
            <th>#</th>
            <th>Topic Name</th>
            <th>Query</th>
            <th>Score</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="text-lg text-center">
          {searchInfos.map((item, index) => (
            <tr key={item._id}>
              <th>{index + 1}</th>

              <td className="font-medium">{item.topicName || "No topic"}</td>
              <td>{item.query || "No query"}</td>

              <td>
                {item.userScore} / {item.searchData?.questions?.length || 0}
              </td>

              <td>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "-"}
              </td>

              <td>
                <div className="flex justify-center items-center gap-2">
                  {/* Favourite button */}
                  <button
                    onClick={() =>
                      handleFavourite(item.favouriteTopic, item._id)
                    }
                    className="text-xl btn btn-ghost  text-blue-800"
                  >
                    {item.favouriteTopic ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost text-2xl text-rose-900"
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivity;
