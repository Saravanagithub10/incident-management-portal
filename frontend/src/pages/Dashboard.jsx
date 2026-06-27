import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    TotalIncidents: 0,
    OpenIncidents: 0,
    InProgressIncidents: 0,
    ResolvedIncidents: 0
  });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <MainLayout>

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">

          <div className="card text-white bg-primary mb-3">

            <div className="card-body">

              <h5>Total Incidents</h5>

              <h2>{stats.TotalIncidents}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-white bg-danger mb-3">

            <div className="card-body">

              <h5>Open</h5>

              <h2>{stats.OpenIncidents}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-white bg-warning mb-3">

            <div className="card-body">

              <h5>In Progress</h5>

              <h2>{stats.InProgressIncidents}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card text-white bg-success mb-3">

            <div className="card-body">

              <h5>Resolved</h5>

              <h2>{stats.ResolvedIncidents}</h2>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default Dashboard;