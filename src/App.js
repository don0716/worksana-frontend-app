import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./auth/Login";
import Sidebar from "./layout/Sidebar";
import Project from "./pages/Project";
import Team from "./pages/Team";
import Report from "./pages/Report";
import { UserProvider } from "./contexts/UserContext";
import { TaskProvider } from "./contexts/AppDataContext";
import { ReportsProvider } from "./contexts/ReportsDataContext";
import ProjectDetails from "./pages/detailsPages/ProjectDetails";
import TaskDetails from "./pages/detailsPages/TaskDetails";
import TeamDetails from "./pages/detailsPages/TeamDetails";
import PrivateRoute from "./auth/ProtectedRoute";
import SignUp from "./auth/SignUp";

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <ReportsProvider>
          <Router>
            <div className="d-flex gap-2">
              <Sidebar />
              <main className="flex-grow-1 p-3">
                <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/register" element={<SignUp />} />

                  <Route
                    path="/project"
                    element={
                      <PrivateRoute>
                        <Project />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/project/:projectId"
                    element={
                      <PrivateRoute>
                        <ProjectDetails />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/task/:taskId"
                    element={
                      <PrivateRoute>
                        <TaskDetails />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/teams"
                    element={
                      <PrivateRoute>
                        <Team />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/teams/:teamId"
                    element={
                      <PrivateRoute>
                        <TeamDetails />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/report"
                    element={
                      <PrivateRoute>
                        <Report />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </ReportsProvider>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
