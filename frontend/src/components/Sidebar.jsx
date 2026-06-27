import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="bg-light border-end vh-100 p-3"
    >

      <h5 className="mb-4">
        Navigation
      </h5>

      <div className="d-grid gap-2">

        <Link
          to="/dashboard"
          className="btn btn-outline-primary"
        >
          Dashboard
        </Link>

        <Link
          to="/incidents"
          className="btn btn-outline-primary"
        >
          Incidents
        </Link>

        <Link
          to="/incidents/create"
          className="btn btn-outline-success"
        >
          Create Incident
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;