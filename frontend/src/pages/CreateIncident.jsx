import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";

function CreateIncident() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/incidents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

toast.success("Incident created successfully");
      navigate("/incidents");

    } catch (error) {

      console.log(error);

     toast.error(
  error.response?.data?.message ||
  "Failed to create incident"
);

    }

  };

  return (

    <MainLayout>

      <h2 className="mb-4">
        Create Incident
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">
            Title
          </label>

          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="5"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Priority
          </label>

          <select
            className="form-select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

            <option value="Critical">
              Critical
            </option>

          </select>

        </div>

        <button
          type="submit"
          className="btn btn-success"
        >
          Create Incident
        </button>

      </form>

    </MainLayout>

  );

}

export default CreateIncident;