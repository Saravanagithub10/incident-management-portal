import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className="col-md-2 p-0">
            <Sidebar />
          </div>

          <div className="col-md-10 p-4">
            {children}
          </div>

        </div>
      </div>
    </>
  );
}

export default MainLayout;