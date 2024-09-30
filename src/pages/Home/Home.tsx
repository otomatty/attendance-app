import { Component, createSignal, createEffect } from "solid-js";
import { supabase } from "../../lib/supabase";
import QRScanner from "../../components/QRScanner/QRScanner";
import FaceCapture from "./components/FaceCapture";
import AlertDialog from "./components/AlertDialog";

const Home: Component = () => {
  const [employeeId, setEmployeeId] = createSignal<string | null>(null);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("employees")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching employee id:", error);
      } else if (data) {
        setEmployeeId(data.id);
      }
    }
  });

  const handleQRScan = async (decodedText: string) => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, name")
        .eq("qr_code", decodedText)
        .single();

      if (error) throw error;

      if (data) {
        setEmployeeName(data.name);
        // 打刻処理
        const { error: clockInError } = await supabase
          .from("attendance_records")
          .insert({ employee_id: data.id, check_in: new Date().toISOString() });

        if (clockInError) throw clockInError;

        console.log(`${data.name}さんの打刻が完了しました。`);
      } else {
        setError("従業員情報が見つかりません。");
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("処理中にエラーが発生しました。");
    }
  };

  const handleQRError = (error: string) => {
    setError(error);
  };

  return (
    <div>
      <h1>勤怠管理システム</h1>
      <QRScanner onScan={handleQRScan} onError={handleQRError} />
      <FaceCapture />
      {employeeId() && <AlertDialog employeeId={employeeId()!} />}
      {employeeName() && <p>従業員名: {employeeName()}</p>}
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default Home;
