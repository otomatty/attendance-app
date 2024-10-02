import { Component, createSignal, Show, onMount } from "solid-js";
import { getLatestAttendanceRecord } from "../../../../lib/supabase/attendance";
import { getEmployeeById } from "../../../../lib/supabase/employees";
import {
  getMaxWorkHours,
  createAlert,
} from "../../../../lib/supabase/settings";

interface AlertDialogProps {
  employeeId: string;
}

const AlertDialog: Component<AlertDialogProps> = (props) => {
  const [showAlert, setShowAlert] = createSignal(false);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const checkAndShowAlert = async () => {
    try {
      const maxWorkHours = await getMaxWorkHours();
      const latestRecord = await getLatestAttendanceRecord(props.employeeId);
      const employee = await getEmployeeById(props.employeeId);

      if (employee) {
        setEmployeeName(employee.first_name + " " + employee.last_name);
      }

      if (latestRecord) {
        const lastCheckIn = new Date(latestRecord.check_in);
        const now = new Date();
        const hoursSinceLastCheckIn =
          (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);

        if (!latestRecord.check_out && hoursSinceLastCheckIn > maxWorkHours) {
          setShowAlert(true);
        }
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("勤怠記録の確認中にエラーが発生しました。");
    }
  };

  onMount(() => {
    checkAndShowAlert();
  });

  const handleOption = async (option: string) => {
    setShowAlert(false);
    try {
      switch (option) {
        case "clockIn":
          // 打刻処理（QRScannerコンポーネントと同様の処理）
          break;
        case "onLeave":
          await createAlert(props.employeeId, "on_leave");
          break;
        case "checkLater":
          await createAlert(props.employeeId, "check_later");
          break;
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("選択の処理中にエラーが発生しました。");
    }
  };

  return (
    <Show when={showAlert()}>
      <div class="alert-dialog">
        <h3>打刻忘れの可能性があります</h3>
        <p>{employeeName()}さん、以下のオプションから選択してください：</p>
        <button onClick={() => handleOption("clockIn")}>
          打刻忘れ - 今すぐ打刻
        </button>
        <button onClick={() => handleOption("onLeave")}>
          問題なし - 休暇中/出張中
        </button>
        <button onClick={() => handleOption("checkLater")}>後で確認</button>
        {error() && <p class="error">{error()}</p>}
      </div>
    </Show>
  );
};

export default AlertDialog;
