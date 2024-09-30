import { Component } from "solid-js";
import ReportGenerator from "./components/ReportGenerator";

const Reports: Component = () => {
  return (
    <div>
      <h1>レポート生成</h1>
      <ReportGenerator />
    </div>
  );
};

export default Reports;
