import { useContext } from "react";
import { UserRoleContext } from "../context/UserRoleContext";

const useUserRole = () => {
  const userInfo = useContext(UserRoleContext);
  return userInfo;
};

export default useUserRole;
