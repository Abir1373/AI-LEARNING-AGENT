import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user) {
    navigate(from);
  }

  const onSubmit = async (data) => {
    await signIn(data.email, data.password);

    Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      text: "You have logged in successfully",
      confirmButtonColor: "#92400e",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate(from);
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Please Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                  message:
                    "Must include 1 Alphabet, 1 Digit & 1 Special Character",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {/* Show Password */}
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="text-sm">Show Password</span>
            </div>

            <button className="btn btn-primary text-white mt-4">Login</button>
          </fieldset>
          <p>
            <small>
              New to this website?{" "}
              <Link state={{ from }} className="btn btn-link" to="/signup">
                Register
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
