import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupUser } from "../services/ authService";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
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

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const response = await signupUser(formData);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error(
       error?.response?.data?.error?.details[0]?.message || error?.response?.data?.message ||
        "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-image">
        <div className="overlay">
          <h1>Join Todo Manager</h1>
          <p>
            Create your account and start managing your daily tasks efficiently.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="auth-card"
      >
        <h1>Create Account</h1>

        <p>
          Start organizing your work today
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

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
          {
            loading
              ? "Creating..."
              : "Create Account"
          }
        </button>

        <span>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </span>

      </form>

    </div>
  );
}

export default Signup;