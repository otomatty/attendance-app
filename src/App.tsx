import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const App: Component = () => {
  return (
    <AdminAuthProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route
          path="/admin/dashboard"
          component={() => (
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          )}
        />
      </Router>
    </AdminAuthProvider>
  );
};

export default App;
