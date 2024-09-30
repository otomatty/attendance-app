import { Component } from "solid-js";
import EmployeeList from "./components/EmployeeList";

const AdminDashboard: Component = () => {
  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <EmployeeList />
    </div>
  );
};

export default AdminDashboard;
