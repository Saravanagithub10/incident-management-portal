import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from "react-toastify";
import api from "../services/api";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await api.get("/incidents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setIncidents(response.data.incidents);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

  const deleteIncident = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this incident?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

toast.success("Incident deleted successfully");
      fetchIncidents();
    } catch (error) {
      console.log(error);

      toast.error(
  error.response?.data?.message ||
  "Delete failed"
);
    }
  };

 
  const filteredIncidents = incidents.filter((incident) => {

  const matchesSearch =
    incident.Title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "" ||
    incident.Status === statusFilter;

  const matchesPriority =
    priorityFilter === "" ||
    incident.Priority === priorityFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority
  );

});

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Incidents</h2>

        <Link to="/incidents/create" className="btn btn-primary">
          + Create Incident
        </Link>
      </div>

      <div className="row mb-3">

  <div className="col-md-4">

    <input
      type="text"
      className="form-control"
      placeholder="🔍 Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

  </div>

  <div className="col-md-4">

    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >

      <option value="">All Status</option>

      <option value="Open">Open</option>

      <option value="In Progress">
        In Progress
      </option>

      <option value="Resolved">
        Resolved
      </option>

      <option value="Closed">
        Closed
      </option>

    </select>

  </div>

  <div className="col-md-4">

    <select
      className="form-select"
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
    >

      <option value="">All Priority</option>

      <option value="Low">Low</option>

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

</div>

     {loading ? (

  <div className="text-center mt-5">

    <div
      className="spinner-border text-primary"
      role="status"
    >
      <span className="visually-hidden">
        Loading...
      </span>
    </div>

    <p className="mt-3">
      Loading incidents...
    </p>

  </div>

) : (

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
          {filteredIncidents.length > 0 ? (
            filteredIncidents.map((incident) => (
              <tr key={incident.Id}>
                <td>{incident.Title}</td>

                <td>
                  {incident.Priority === "Critical" && (
                    <span className="badge bg-dark">Critical</span>
                  )}

                  {incident.Priority === "High" && (
                    <span className="badge bg-danger">High</span>
                  )}

                  {incident.Priority === "Medium" && (
                    <span className="badge bg-warning text-dark">
                      Medium
                    </span>
                  )}

                  {incident.Priority === "Low" && (
                    <span className="badge bg-success">Low</span>
                  )}
                </td>

                <td>
                  {incident.Status === "Open" && (
                    <span className="badge bg-danger">Open</span>
                  )}

                  {incident.Status === "In Progress" && (
                    <span className="badge bg-warning text-dark">
                      In Progress
                    </span>
                  )}

                  {incident.Status === "Resolved" && (
                    <span className="badge bg-success">Resolved</span>
                  )}

                  {incident.Status === "Closed" && (
                    <span className="badge bg-secondary">Closed</span>
                  )}
                </td>

                <td>
                  {new Date(incident.CreatedAt).toLocaleString()}
                </td>

                <td>
                  <Link
                    to={`/incidents/edit/${incident.Id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    ✏️ Edit
                  </Link>

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
  <td colSpan="5" className="text-center py-5">

    <div className="d-flex flex-column align-items-center">

      <div
        style={{
          fontSize: "60px"
        }}
      >
        📂
      </div>

      <h4 className="mt-3">
        No Incidents Found
      </h4>

      <p className="text-muted">
        Create your first incident to get started.
      </p>

      <Link
        to="/incidents/create"
        className="btn btn-primary"
      >
        + Create Incident
      </Link>

    </div>

  </td>
</tr>
          )}
        </tbody>
      </table>

)}
    </MainLayout>
  );
}

export default Incidents;