import { Component, createSignal } from "solid-js";
import { AttendanceUpdateData } from "../../types/attendance";
import {
  getLatestAttendanceRecord,
  updateAttendanceRecord,
} from "../../lib/supabase/attendance";
import { createAttendanceEdit } from "../../lib/supabase/settings";
import AttendanceForm from "./components/AttendanceForm/AttendanceForm";
import EditHistory from "./components/EditHistory/EditHistory";
import {
  container,
  title,
  formSection,
  historySection,
  errorMessage,
  successMessage,
} from "./AttendanceEdit.css";

const AttendanceEdit: Component = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = createSignal<
    string | null
  >(null);
  const [error, setError] = createSignal<string | null>(null);
  const [success, setSuccess] = createSignal<string | null>(null);

  const handleAttendanceUpdate = async (
    updatedRecord: AttendanceUpdateData
  ) => {
    if (!selectedEmployeeId()) {
      setError("従業員が選択されていません。");
      return;
    }

    try {
      const latestRecord = await getLatestAttendanceRecord(
        selectedEmployeeId()!
      );
      if (!latestRecord) {
        setError("最新の勤怠記録が見つかりません。");
        return;
      }

      const { reason, ...recordUpdate } = updatedRecord;
      const updatedAttendance = await updateAttendanceRecord(
        latestRecord.id,
        recordUpdate
      );

      await createAttendanceEdit({
        attendance_record_id: latestRecord.id,
        employee_id: selectedEmployeeId()!,
        old_check_in: latestRecord.check_in,
        old_check_out: latestRecord.check_out,
        new_check_in: updatedAttendance.check_in,
        new_check_out: updatedAttendance.check_out,
        reason: reason || "理由なし",
        edited_by: "現在のユーザーID", // TODO: 実際のユーザーIDに置き換える
      });

      setError(null);
      setSuccess("勤怠記録が正常に更新されました。");
    } catch (err) {
      console.error("勤怠記録の更新に失敗しました:", err);
      setError("勤怠記録の更新に失敗しました。");
    }
  };

  return (
    <div class={container}>
      <h1 class={title}>勤怠記録編集</h1>
      <div class={formSection}>
        <AttendanceForm
          onSubmit={handleAttendanceUpdate}
          onEmployeeSelect={setSelectedEmployeeId}
        />
      </div>
      {selectedEmployeeId() && (
        <div class={historySection}>
          <EditHistory employeeId={selectedEmployeeId()!} />
        </div>
      )}
      {error() && <p class={errorMessage}>{error()}</p>}
      {success() && <p class={successMessage}>{success()}</p>}
    </div>
  );
};

export default AttendanceEdit;
