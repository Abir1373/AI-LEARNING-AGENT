import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { FaUsers, FaUserShield, FaUserClock } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const ViewUsers = () => {
  const axiosInstance = useAxios();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (e, id) => {
    const newRole = e.target.value;
    await axiosInstance.patch(`/users/role/${id}`, { role: newRole });
    refetch();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted from database and Firebase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await axiosInstance.delete(`/users/${id}`);
      if (res.data.success || res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        refetch();
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  });

  // Quick stats
  const adminCount = users.filter((u) => u.role === "admin").length;
  const pendingCount = users.filter((u) => u.role === "pending").length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaUsers className="text-primary" />
            Manage Users
          </h1>
          <p className="text-sm opacity-60 mt-1">
            {users.length} total user{users.length !== 1 ? "s" : ""}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-base-100 border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="bg-primary/10 text-primary p-3 rounded-xl">
            <FaUsers className="text-xl" />
          </div>
          <div>
            <p className="text-sm opacity-60">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>

        <div className="bg-base-100 border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
            <FaUserShield className="text-xl" />
          </div>
          <div>
            <p className="text-sm opacity-60">Admins</p>
            <p className="text-2xl font-bold">{adminCount}</p>
          </div>
        </div>

        <div className="bg-base-100 border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <div className="bg-warning/10 text-warning p-3 rounded-xl">
            <FaUserClock className="text-xl" />
          </div>
          <div>
            <p className="text-sm opacity-60">Pending</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Users List */}
      {users.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <FaUsers className="text-5xl mx-auto mb-4" />
          <p>No users yet</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-24 opacity-50">
          <p>No users found</p>
        </div>
      ) : (
        <div className="bg-base-100 border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200/50 text-sm">
                  <th className="w-16">#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id || index} className="hover">
                    <td className="font-medium opacity-60">{index + 1}</td>

                    {/* Avatar + Name */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img
                              src={
                                user.image ||
                                "https://img.daisyui.com/images/profile/demo/2@94.webp"
                              }
                              alt={user.name || "User"}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {user.name || "No Name"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <span className="text-sm opacity-80">
                        {user.email || "No Email"}
                      </span>
                    </td>

                    {/* Role */}
                    <td>
                      <select
                        className="select select-bordered select-sm w-full max-w-[130px]"
                        value={user.role || "user"}
                        onChange={(e) => handleRoleChange(e, user._id)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>

                    {/* Delete */}
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost btn-sm btn-circle text-error"
                        title="Delete user"
                      >
                        <RiDeleteBin4Fill className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
