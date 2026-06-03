import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/ authService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "loggedInUser",
        response.data.username
      );

      toast.success(
        response.data.message
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (error) {
      console.log("error", error?.response?.data?.message)
      toast.error(
       error?.response?.data?.error?.details[0]?.message || error?.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-image">
        <div className="overlay">
          <h1>Todo Manager</h1>
          <p>
            Organize your tasks and stay productive.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="auth-card"
      >
        <h1>Welcome Back</h1>

        <p>Login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? "Signing In..." : "Login"}
        </button>

        <span>
          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;