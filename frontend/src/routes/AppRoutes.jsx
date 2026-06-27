import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Incidents from "../pages/Incidents";
import CreateIncident from "../pages/CreateIncident";
import EditIncident from "../pages/EditIncident";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/incidents"
                    element={
                        <ProtectedRoute>
                            <Incidents />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/incidents/create"
                    element={
                        <ProtectedRoute>
                            <CreateIncident />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/incidents/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditIncident />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;