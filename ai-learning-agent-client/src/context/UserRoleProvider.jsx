import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { UserRoleContext } from "./UserRoleContext";

const UserRoleProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosInstance = useAxios();

  const {
    data: role = "user",
    isLoading: roleLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data?.role || "user";
    },
    staleTime: 1000 * 60 * 5,
  });

  const userRoleInfo = {
    role,
    roleLoading: authLoading || roleLoading,
    isError,
    error,
    refetchRole: refetch,
  };

  return <UserRoleContext value={userRoleInfo}>{children}</UserRoleContext>;
};

export default UserRoleProvider;
