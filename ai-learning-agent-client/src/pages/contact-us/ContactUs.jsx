import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const Contact = () => {
  const axiosInstance = useAxios();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/contact", data);

      if (res.data) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you soon.",
          confirmButtonColor: "#570df8",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send message. Please try again.",
        confirmButtonColor: "#570df8",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-sm opacity-60 mt-2">
          Have questions or feedback? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-5">
          <div className="bg-base-100 border rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="bg-primary/10 text-primary p-3 rounded-xl">
              <FaEnvelope className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm opacity-70 mt-1">support@ailearner.com</p>
            </div>
          </div>

          <div className="bg-base-100 border rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="bg-secondary/10 text-secondary p-3 rounded-xl">
              <FaPhone className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-sm opacity-70 mt-1">+880 1234-567890</p>
            </div>
          </div>

          <div className="bg-base-100 border rounded-2xl p-5 flex items-start gap-4 shadow-sm">
            <div className="bg-accent/10 text-accent p-3 rounded-xl">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm opacity-70 mt-1">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-error text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-error text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className={`input input-bordered w-full ${
                    errors.subject ? "input-error" : ""
                  }`}
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                />
                {errors.subject && (
                  <p className="text-error text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  placeholder="Write your message here..."
                  className={`textarea textarea-bordered w-full h-32 ${
                    errors.message ? "textarea-error" : ""
                  }`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-error text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaPaperPlane />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
