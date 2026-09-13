import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        //update userInfo in the database
        const userInfo = {
          email: data.email,
          role: "user",
          dob: data.dob,
          image: data.image,
          name: data.name,
          occupation: data.occupation,
          password: data.password,
          phone: data.phone,
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: data.image,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name pic updated");
            Swal.fire({
              title: "Signup Complete!",
              icon: "success",
              draggable: true,
            });
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl ">
      <div className="card-body">
        <h1 className="text-4xl font-bold mt-1">Create Account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset space-y-3">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input w-full"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* Phone + Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  className="input w-full"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                  className="input w-full"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob.message}</p>
                )}
              </div>
            </div>
            {/* Occupation + Profile Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Occupation</label>
                <select
                  {...register("occupation", {
                    required: "Please select your occupation",
                  })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select occupation
                  </option>
                  <option value="student">Student</option>
                  <option value="currently employed">Currently Employed</option>
                  <option value="teacher">Teacher</option>
                  <option value="others">Others</option>
                </select>
                {errors.occupation && (
                  <p className="text-red-500 text-sm">
                    {errors.occupation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Profile Image</label>
                <input
                  type="url"
                  {...register("image", {
                    required: "Profile image URL is required",
                    pattern: {
                      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                      message: "Please enter a valid image URL",
                    },
                  })}
                  className="input w-full"
                  placeholder="https://example.com/photo.jpg"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>
            </div>
            {/* Password - full width */}
            <div>
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
                className="input w-full"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

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

            <button className="btn btn-primary text-white mt-4 w-full">
              Sign Up
            </button>
          </fieldset>

          <p className="mt-4 text-center">
            <small>
              Already have an account?{" "}
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
            </small>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
