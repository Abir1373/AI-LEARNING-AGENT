import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios"; // or use your axiosInstance

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  const updateUserPassword = (newPassword) => {
    return updatePassword(auth.currentUser, newPassword);
  };

  const updateUserEmail = (newEmail) => {
    return updateEmail(auth.currentUser, newEmail);
  };

  const logOut = () => {
    localStorage.removeItem("access-token"); // clear token on logout
    setLoading(true);
    return signOut(auth);
  };

  const deleteUserInfo = () => {
    return deleteUser(auth.currentUser);
  };

  // Observe auth state + generate JWT
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // User is logged in → get JWT from backend
        try {
          const res = await axios.post("http://localhost:3000/jwt", {
            email: currentUser.email,
          });
          localStorage.setItem("access-token", res.data.token);
        } catch (error) {
          console.error("JWT Error:", error);
        }
      } else {
        // User logged out → remove token
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserPassword,
    updateUserEmail,
    updateUserProfile,
    deleteUserInfo,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
