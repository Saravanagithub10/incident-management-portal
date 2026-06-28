import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post("/auth/register", {

        name,
        email,
        password,
        role

      });

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Create Account
        </h2>

        <p className="auth-subtitle">
          Register to Incident Management Portal
        </p>

        <form onSubmit={handleRegister}>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Role
            </label>

            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >

              <option value="Employee">
                Employee
              </option>

              <option value="Admin">
                Admin
              </option>

            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="btn btn-success btn-login"
            disabled={loading}
          >

            {
              loading
                ? "Registering..."
                : "Register"
            }

          </button>

        </form>

        <p className="text-center mt-3">

          Already have an account?

          <Link
            to="/"
            className="ms-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;