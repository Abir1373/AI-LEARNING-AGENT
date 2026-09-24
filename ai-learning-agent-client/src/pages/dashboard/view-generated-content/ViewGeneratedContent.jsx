import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";
import { FaStar, FaRegStar, FaTrash, FaBookOpen } from "react-icons/fa";

const ViewGeneratedContent = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  const {
    data: contents = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["generated-content"],
    queryFn: async () => {
      const res = await axiosInstance.get("/search-data/all");
      return res.data;
    },
  });

  const handleToggleFavourite = async (id, current) => {
    await axiosInstance.patch("/mark-favourite", {
      id,
      favouriteTopic: !current,
    });
    refetch();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this generated quiz?")) return;
    await axiosInstance.delete(`/search-data/${id}`);
    refetch();
    if (selected?._id === id) setSelected(null);
  };

  const filtered = contents.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.query?.toLowerCase().includes(term) ||
      item.topicName?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ========== QUIZ PREVIEW (when a card is clicked) ==========
  if (selected) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => setSelected(null)}
          className="btn btn-sm btn-ghost mb-6"
        >
          ← Back
        </button>

        <div className="bg-base-100 rounded-2xl shadow-lg border p-6 mb-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold">{selected.query}</h1>
              <p className="text-sm opacity-60 mt-1">
                {selected.topicName} • {selected.email}
              </p>
              <p className="text-xs opacity-50 mt-1">
                {new Date(selected.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() =>
                handleToggleFavourite(selected._id, selected.favouriteTopic)
              }
              className="btn btn-circle btn-sm"
            >
              {selected.favouriteTopic ? (
                <FaStar className="text-warning" />
              ) : (
                <FaRegStar />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {selected.searchData?.questions?.map((q, i) => (
            <div
              key={i}
              className="bg-base-100 rounded-xl border p-5 shadow-sm"
            >
              <p className="font-medium mb-4">
                <span className="text-primary mr-2">{i + 1}.</span>
                {q.question}
              </p>

              <div className="grid gap-2">
                {q.options.map((opt, idx) => {
                  const isCorrect = opt === q.correctAnswer;
                  return (
                    <div
                      key={idx}
                      className={`px-4 py-2.5 rounded-lg text-sm border ${
                        isCorrect
                          ? "bg-success/15 border-success text-success font-medium"
                          : "bg-base-200 border-transparent"
                      }`}
                    >
                      {opt}
                      {isCorrect && (
                        <span className="ml-2 text-xs">(Correct)</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <p className="mt-4 text-sm opacity-70 bg-base-200 p-3 rounded-lg">
                  <span className="font-semibold">Explanation:</span>{" "}
                  {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========== MAIN CARD GRID ==========
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaBookOpen className="text-primary" />
            Generated Content
          </h1>
          <p className="text-sm opacity-60 mt-1">
            {contents.length} quiz{contents.length !== 1 ? "zes" : ""} generated
          </p>
        </div>

        <input
          type="text"
          placeholder="Search topic, query or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <FaBookOpen className="text-5xl mx-auto mb-4" />
          <p>No generated content found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 border shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelected(item)}
            >
              <div className="card-body p-5">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <span className="badge badge-primary badge-outline badge-sm">
                    {item.topicName}
                  </span>

                  <div
                    className="flex gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h2 className="card-title text-lg mt-2 group-hover:text-primary transition-colors">
                  {item.query}
                </h2>

                {/* Meta */}
                <div className="text-sm opacity-60 space-y-1 mt-2">
                  <p>{item.email}</p>
                  <p>
                    {item.searchData?.questions?.length || 0} questions •{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Footer */}
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-primary btn-outline">
                    View Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewGeneratedContent;
