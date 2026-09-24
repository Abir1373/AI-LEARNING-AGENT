import { useQuery } from "@tanstack/react-query";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";

const ContactRequests = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: contacts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-requests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contact");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This message will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/contact/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Message has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to delete message.", "error");
      }
    }
  };

  const filteredContacts = contacts.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term)
    );
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaEnvelopeOpenText className="text-primary" />
            Contact Requests
          </h1>
          <p className="text-sm opacity-60 mt-1">
            {contacts.length} message{contacts.length !== 1 ? "s" : ""} received
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Empty State */}
      {contacts.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <FaEnvelopeOpenText className="text-5xl mx-auto mb-4" />
          <p>No contact messages yet</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <p>No matching messages found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredContacts.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 rounded-2xl border shadow-sm hover:shadow-md transition-all p-5 flex flex-col"
            >
              {/* Top */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm opacity-60">{item.email}</p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-ghost btn-xs btn-circle text-error"
                  title="Delete"
                >
                  <RiDeleteBin4Fill className="text-lg" />
                </button>
              </div>

              {/* Subject */}
              <div className="mt-4">
                <p className="text-xs opacity-50 mb-1">Subject</p>
                <p className="font-medium">{item.subject}</p>
              </div>

              {/* Message */}
              <div className="mt-3 flex-1">
                <p className="text-xs opacity-50 mb-1">Message</p>
                <p className="text-sm opacity-80 line-clamp-4">
                  {item.message}
                </p>
              </div>

              {/* Date */}
              <div className="mt-4 pt-3 border-t text-xs opacity-50">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactRequests;
