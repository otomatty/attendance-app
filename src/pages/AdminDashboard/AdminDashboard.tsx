import { Component } from "solid-js";
import EmployeeList from "./components/EmployeeList";
import MaxWorkHoursSetting from "./components/MaxWorkHoursSetting";
const AdminDashboard: Component = () => {
  return (
    <div>
      <h1>管理者ダッシュボード</h1>
      <MaxWorkHoursSetting />
      <EmployeeList />
    </div>
  );
};

export default AdminDashboard;
