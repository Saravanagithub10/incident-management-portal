import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/incidents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIncidents(response.data.incidents);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteIncident = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this incident?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await api.delete(
      `/incidents/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Incident deleted successfully");

    fetchIncidents();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Delete failed"
    );

  }

};

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Incidents</h2>

        <Link
          to="/incidents/create"
          className="btn btn-primary"
        >
          + Create Incident
        </Link>
      </div>

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th style={{ width: "170px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>

          {incidents.length > 0 ? (

            incidents.map((incident) => (

              <tr key={incident.Id}>

                <td>{incident.Title}</td>

                <td>

                  {incident.Priority === "Critical" && (
                    <span className="badge bg-dark">
                      Critical
                    </span>
                  )}

                  {incident.Priority === "High" && (
                    <span className="badge bg-danger">
                      High
                    </span>
                  )}

                  {incident.Priority === "Medium" && (
                    <span className="badge bg-warning text-dark">
                      Medium
                    </span>
                  )}

                  {incident.Priority === "Low" && (
                    <span className="badge bg-success">
                      Low
                    </span>
                  )}

                </td>

                <td>

                  {incident.Status === "Open" && (
                    <span className="badge bg-danger">
                      Open
                    </span>
                  )}

                  {incident.Status === "In Progress" && (
                    <span className="badge bg-warning text-dark">
                      In Progress
                    </span>
                  )}

                  {incident.Status === "Resolved" && (
                    <span className="badge bg-success">
                      Resolved
                    </span>
                  )}

                  {incident.Status === "Closed" && (
                    <span className="badge bg-secondary">
                      Closed
                    </span>
                  )}

                </td>

                <td>
                  {new Date(
                    incident.CreatedAt
                  ).toLocaleString()}
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                  >
                    ✏️ Edit
                  </button>

                  <button
  className="btn btn-danger btn-sm"
  onClick={() => deleteIncident(incident.Id)}
>
  🗑️ Delete
</button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="5"
                className="text-center text-muted"
              >
                No incidents found.
              </td>

            </tr>

          )}

        </tbody>

      </table>
    </MainLayout>
  );
}

export default Incidents;