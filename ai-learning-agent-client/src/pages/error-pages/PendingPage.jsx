import { Link, Navigate } from "react-router";
import { FaClock, FaHome } from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";

const PendingPage = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // If role is already "user" or "admin", redirect to dashboard
  if (role === "user" || role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body items-center text-center">
          {/* Icon */}
          <div className="text-6xl text-warning mb-4">
            <FaClock />
          </div>

          {/* Title */}
          <h2 className="card-title text-2xl mb-2">Account Pending</h2>

          {/* Message */}
          <p className="text-base-content/70 mb-6">
            Your account is under review. Please wait for admin approval.
          </p>

          {/* Status */}
          <div className="badge badge-warning badge-lg mb-6 gap-2">
            <span className="loading loading-spinner loading-xs"></span>
            Pending
          </div>

          {/* Button */}
          <Link to="/" className="btn btn-primary gap-2">
            <FaHome />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
