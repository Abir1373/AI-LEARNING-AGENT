import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const ViewUsers = () => {
  const axiosInstance = useAxios();

  const { data: users = [], isLoading } = useQuery({
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

  if (users.length === 0) {
    return <div className="text-center py-20 text-gray-500">No Users Yet</div>;
  }

  return (
    <div className="overflow-x-auto m-6">
      <table className="table">
        {/* head */}
        <thead className="text-base">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <th>{index + 1}</th>

              {/* User Name + Photo */}
              <td>
                <div className="flex items-center gap-3">
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
                  <div>
                    <div className="font-bold">{user.name || "No Name"}</div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td>{user.email || "No Email"}</td>

              {/* Role */}
              <td>
                <span className="badge badge-ghost badge-sm">
                  {user.role || "user"}
                </span>
              </td>

              {/* Action */}
              <td>
                <button className="btn btn-ghost btn-xs">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
