import { Component } from "solid-js";
import AttendanceForm from "./components/AttendanceForm";
import EditHistory from "./components/EditHistory";

const AttendanceEdit: Component = () => {
  return (
    <div>
      <h1>勤怠記録編集</h1>
      <AttendanceForm />
      <EditHistory />
    </div>
  );
};

export default AttendanceEdit;
