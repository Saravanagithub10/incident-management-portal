import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">
          Incident Management Portal
        </h2>

        <p className="auth-subtitle">
          Azure Cloud Incident Tracking System
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?

          <Link
            to="/register"
            className="ms-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;