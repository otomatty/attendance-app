import { Component, createSignal } from "solid-js";
import { supabase } from "../../../lib/supabase";

interface AttendanceRecord {
  id: string;
  employee_id: string;
  employees: {
    name: string;
  }[];
  check_in: string;
  check_out: string | null;
}

interface FormattedAttendanceRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  check_in: string;
  check_out: string | null;
}

const ReportGenerator: Component = () => {
  const [startDate, setStartDate] = createSignal("");
  const [endDate, setEndDate] = createSignal("");
  const [reportData, setReportData] = createSignal<FormattedAttendanceRecord[]>(
    []
  );
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const generateReport = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("attendance_records")
        .select(
          `
          id,
          employee_id,
          employees(name),
          check_in,
          check_out
        `
        )
        .gte("check_in", `${startDate()}T00:00:00`)
        .lte("check_in", `${endDate()}T23:59:59`)
        .order("check_in", { ascending: true });

      if (error) throw error;

      setReportData(
        (data as AttendanceRecord[]).map((record) => ({
          id: record.id,
          employee_id: record.employee_id,
          employee_name: record.employees[0]?.name || "Unknown",
          check_in: record.check_in,
          check_out: record.check_out,
        }))
      );
    } catch (err) {
      console.error("レポート生成中にエラーが発生しました:", err);
      setError("レポートの生成に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalHours = (checkIn: string, checkOut: string | null) => {
    if (!checkOut) return "N/A";
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}時間${minutes}分`;
  };

  const downloadCSV = () => {
    const headers = [
      "従業員ID",
      "従業員名",
      "出勤時間",
      "退勤時間",
      "勤務時間",
    ];
    const csvContent = [
      headers.join(","),
      ...reportData().map((record) =>
        [
          record.employee_id,
          record.employee_name,
          new Date(record.check_in).toLocaleString(),
          record.check_out
            ? new Date(record.check_out).toLocaleString()
            : "N/A",
          calculateTotalHours(record.check_in, record.check_out),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `attendance_report_${startDate()}_${endDate()}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div class="report-generator">
      <h2>勤怠レポート生成</h2>
      <form onSubmit={generateReport}>
        <div>
          <label for="start-date">開始日:</label>
          <input
            id="start-date"
            type="date"
            value={startDate()}
            onInput={(e) => setStartDate(e.currentTarget.value)}
            required
          />
        </div>
        <div>
          <label for="end-date">終了日:</label>
          <input
            id="end-date"
            type="date"
            value={endDate()}
            onInput={(e) => setEndDate(e.currentTarget.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading()}>
          レポート生成
        </button>
      </form>

      {isLoading() && <p>レポートを生成中...</p>}
      {error() && <p class="error">{error()}</p>}

      {reportData().length > 0 && (
        <div>
          <h3>レポート結果</h3>
          <button onClick={downloadCSV}>CSVダウンロード</button>
          <table>
            <thead>
              <tr>
                <th>従業員ID</th>
                <th>従業員名</th>
                <th>出勤時間</th>
                <th>退勤時間</th>
                <th>勤務時間</th>
              </tr>
            </thead>
            <tbody>
              {reportData().map((record) => (
                <tr>
                  <td>{record.employee_id}</td>
                  <td>{record.employee_name}</td>
                  <td>{new Date(record.check_in).toLocaleString()}</td>
                  <td>
                    {record.check_out
                      ? new Date(record.check_out).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    {calculateTotalHours(record.check_in, record.check_out)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
