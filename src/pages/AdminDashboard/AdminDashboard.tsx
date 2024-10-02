import { Component } from "solid-js";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import MaxWorkHoursSetting from "./components/MaxWorkHoursSetting/MaxWorkHoursSetting";
import { container, title, section } from "./AdminDashboard.css";

const AdminDashboard: Component = () => {
  return (
    <div class={container}>
      <h1 class={title}>管理者ダッシュボード</h1>
      <div class={section}>
        <MaxWorkHoursSetting />
      </div>
      <div class={section}>
        <EmployeeList />
      </div>
    </div>
  );
};

export default AdminDashboard;
