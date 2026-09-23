import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useState } from "react";

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleRoleChange = async (e, id) => {
    e.preventDefault();

    const newRole = e.target.value;

    const res = await axiosInstance.patch(`/users/role/${id}`, {
      role: newRole,
    });

    console.log(res.data);
    refetch();
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  // Search users by name, email, or role
  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase().trim();

    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="m-6">
      {/* Search Input */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search user by name, email or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* No users */}
      {users.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No Users Yet</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No users found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-base text-center uppercase">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id || index} className="text-center">
                  {/* # */}
                  <th>{index + 1}</th>

                  {/* Image */}
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.image ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                  </td>

                  {/* User Name */}
                  <td>
                    <div className="font-bold">{user.name || "No Name"}</div>
                  </td>

                  {/* Email */}
                  <td>{user.email || "No Email"}</td>

                  {/* Role */}
                  <td>
                    <select
                      className="select select-bordered select-sm w-full max-w-[140px] uppercase"
                      value={user.role || "user"}
                      onChange={(e) => handleRoleChange(e, user._id)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>

                  {/* Action */}
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <RiDeleteBin4Fill className="text-xl text-rose-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
