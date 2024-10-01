import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminHeader from "./components/AdminHeader/AdminHeader";
import AttendanceEdit from "./pages/AttendanceEdit/AttendanceEdit";
import Reports from "./pages/Reports/Reports";
import EmployeeManagement from "./pages/EmployeeManagement/EmployeeManagement";

const AdminLayout: Component<{ children: any }> = (props) => {
  return (
    <div>
      <AdminHeader />
      <main>{props.children}</main>
    </div>
  );
};

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route
        path="/admin"
        component={(props) => <AdminLayout>{props.children}</AdminLayout>}
      >
        <Route
          path="/dashboard"
          component={() => <ProtectedAdminRoute component={AdminDashboard} />}
        />
        <Route
          path="/employees"
          component={() => (
            <ProtectedAdminRoute component={EmployeeManagement} />
          )}
        />
        <Route
          path="/attendance"
          component={() => <ProtectedAdminRoute component={AttendanceEdit} />}
        />
        <Route
          path="/reports"
          component={() => <ProtectedAdminRoute component={Reports} />}
        />
      </Route>
    </Router>
  );
};

export default App;
