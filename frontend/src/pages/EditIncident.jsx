import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function EditIncident() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: ""
  });

  useEffect(() => {
    fetchIncident();
  }, []);

  const fetchIncident = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        `/incidents/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFormData({
        title: response.data.Title,
        description: response.data.Description,
        priority: response.data.Priority,
        status: response.data.Status
      });

    } catch (error) {

      console.log(error);

    }

  };

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

      await api.put(
        `/incidents/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Incident updated successfully");

      navigate("/incidents");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }

  };

  return (

    <MainLayout>

      <h2 className="mb-4">
        Edit Incident
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
            name="description"
            className="form-control"
            rows="4"
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
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Status
          </label>

          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

        </div>

        <button
          className="btn btn-primary"
          type="submit"
        >
          Update Incident
        </button>

      </form>

    </MainLayout>

  );

}

export default EditIncident;