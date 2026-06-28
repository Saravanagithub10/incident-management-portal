import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    TotalIncidents: 0,
    OpenIncidents: 0,
    InProgressIncidents: 0,
    ResolvedIncidents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard/stats", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setStats(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <h2 className="mb-4">Dashboard</h2>

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

          <h5 className="mt-3">Loading Dashboard...</h5>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-3">
            <div className="card dashboard-card text-white bg-primary mb-3">
              <div className="card-body">
                <h5>
  <i className="bi bi-card-list me-2"></i>
  Total Incidents
</h5>
                <h2>{stats.TotalIncidents}</h2>
                <p className="mb-0">
  View all incidents →
</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
<div className="card dashboard-card text-white bg-danger mb-3">              <div className="card-body">
               <h5>
  <i className="bi bi-exclamation-circle-fill me-2"></i>
  Open
</h5>
                <h2>{stats.OpenIncidents}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dashboard-card text-white bg-warning mb-3">
              <div className="card-body">
                <h5>
  <i className="bi bi-hourglass-split me-2"></i>
  In Progress
</h5>
                <h2>{stats.InProgressIncidents}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dashboard-card text-white bg-success mb-3">
              <div className="card-body">
                <h5>
  <i className="bi bi-check-circle-fill me-2"></i>
  Resolved
</h5>
                <h2>{stats.ResolvedIncidents}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Dashboard;