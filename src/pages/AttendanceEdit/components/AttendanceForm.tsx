import { Component, createSignal } from "solid-js";
import { supabase } from "../../../lib/supabase";

interface AttendanceRecord {
  id: string;
  employee_id: string;
  check_in: string;
  check_out: string | null;
}

const AttendanceForm: Component = () => {
  const [employeeId, setEmployeeId] = createSignal("");
  const [date, setDate] = createSignal("");
  const [checkIn, setCheckIn] = createSignal("");
  const [checkOut, setCheckOut] = createSignal("");
  const [attendanceRecord, setAttendanceRecord] =
    createSignal<AttendanceRecord | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const handleSearch = async (e: Event) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase
        .from("attendance_records")
        .select("*")
        .eq("employee_id", employeeId())
        .gte("check_in", `${date()}T00:00:00`)
        .lt("check_in", `${date()}T23:59:59`)
        .single();

      if (error) throw error;

      if (data) {
        setAttendanceRecord(data);
        setCheckIn(
          new Date(data.check_in).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setCheckOut(
          data.check_out
            ? new Date(data.check_out).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""
        );
      } else {
        setAttendanceRecord(null);
        setCheckIn("");
        setCheckOut("");
        setError("指定された日付の勤怠記録が見つかりません。");
      }
    } catch (err) {
      console.error("勤怠記録の検索に失敗しました:", err);
      setError("勤怠記録の検索に失敗しました。");
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (!attendanceRecord()) {
      setError("編集する勤怠記録が選択されていません。");
      return;
    }

    try {
      const { error } = await supabase
        .from("attendance_records")
        .update({
          check_in: `${date()}T${checkIn()}:00`,
          check_out: checkOut() ? `${date()}T${checkOut()}:00` : null,
        })
        .eq("id", attendanceRecord()!.id);

      if (error) throw error;

      console.log("勤怠記録を更新しました。");
    } catch (err) {
      console.error("勤怠記録の更新に失敗しました:", err);
      setError("勤怠記録の更新に失敗しました。");
    }
  };

  return (
    <div class="attendance-form">
      <h2>勤怠記録編集フォーム</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label for="employee-id">従業員ID:</label>
          <input
            id="employee-id"
            type="text"
            value={employeeId()}
            onInput={(e) => setEmployeeId(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label for="date">日付:</label>
          <input
            id="date"
            type="date"
            value={date()}
            onInput={(e) => setDate(e.currentTarget.value)}
            required
          />
        </div>
        <button type="submit">検索</button>
      </form>

      {attendanceRecord() && (
        <form onSubmit={handleSubmit}>
          <div>
            <label for="check-in">出勤時間:</label>
            <input
              id="check-in"
              type="time"
              value={checkIn()}
              onInput={(e) => setCheckIn(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label for="check-out">退勤時間:</label>
            <input
              id="check-out"
              type="time"
              value={checkOut()}
              onInput={(e) => setCheckOut(e.currentTarget.value)}
            />
          </div>
          <button type="submit">更新</button>
        </form>
      )}

      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default AttendanceForm;
