import { Component, createSignal, Show } from "solid-js";
import { supabase } from "../../../lib/supabase";

const AlertDialog: Component = () => {
  const [showAlert, setShowAlert] = createSignal(false);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const checkAndShowAlert = async (employeeId: string) => {
    try {
      // 最大勤務時間の設定を取得
      const { data: settingsData, error: settingsError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "max_work_hours")
        .single();

      if (settingsError) throw settingsError;
      const maxWorkHours = parseFloat(settingsData.value);

      // 最新の勤怠記録を取得
      const { data, error } = await supabase
        .from("attendance_records")
        .select("check_in, check_out, employees(name)")
        .eq("employee_id", employeeId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setEmployeeName(data.employees.name);
        const lastCheckIn = new Date(data.check_in);
        const now = new Date();
        const hoursSinceLastCheckIn =
          (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);

        if (!data.check_out && hoursSinceLastCheckIn > maxWorkHours) {
          setShowAlert(true);
        }
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("勤怠記録の確認中にエラーが発生しました。");
    }
  };

  const handleOption = async (option: string) => {
    setShowAlert(false);
    try {
      switch (option) {
        case "clockIn":
          // 打刻処理（QRScannerコンポーネントと同様の処理）
          break;
        case "onLeave":
          // 休暇中としてマーク
          await supabase.from("alerts").insert({
            employee_id: "employeeId",
            status: "on_leave",
            alert_time: new Date().toISOString(),
          });
          break;
        case "checkLater":
          // 後で確認としてマーク
          await supabase.from("alerts").insert({
            employee_id: "employeeId",
            status: "check_later",
            alert_time: new Date().toISOString(),
          });
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
