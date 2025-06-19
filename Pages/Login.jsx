import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [loginFormData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const location = useLocation();
  const from = location.state?.from || "/addrecipe";
  const [displayMessage, setDisplayMessage] = React.useState(
    location.state?.message || ""
  );

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setDisplayMessage("");
    setError(null);
    setSuccess(null);
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => {
        setError(null);
        setSuccess("Login Successfull");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const errorMessage =
    error?.code === "auth/user-not-found" ||
    error?.code === "auth/wrong-password" ||
    error?.code === "auth/invalid-credential"
      ? "Invalid email or password."
      : error?.code === "auth/invalid-email"
      ? "Please enter a valid email address."
      : error?.code === "auth/too-many-requests"
      ? "Too many login attempts. Please try again later."
      : error?.code === "auth/network-request-failed"
      ? "Network error. Please check your internet connection."
      : error?.code === "auth/missing-password"
      ? "Password field cannot be empty."
      : error?.message || "";

  const successMessage = success || "";

  return (
    <>
      <div className="message-container">
        {displayMessage && (
          <h3 className="display-message">{displayMessage}</h3>
        )}
        <h3 className="error-message">{errorMessage}</h3>
        <h3 className="success-message">{successMessage}</h3>
      </div>

      <section className="login-section">
        <div className="login-container">
          <h1>Sign in to your account</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <button disabled={status === "submitting"}>
              {status === "submitting" ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
