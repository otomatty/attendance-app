import { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AttendanceEdit from "./pages/AttendanceEdit/AttendanceEdit";
import Reports from "./pages/Reports/Reports";

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/attendance/edit" component={AttendanceEdit} />
      <Route path="/admin/reports" component={Reports} />
    </Router>
  );
};

export default App;
