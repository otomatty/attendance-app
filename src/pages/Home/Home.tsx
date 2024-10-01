import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { supabase } from "../../lib/supabase";
import QRScanner from "../../components/QRScanner/QRScanner";
import AlertDialog from "./components/AlertDialog";

const Home: Component = () => {
  const [employeeId, setEmployeeId] = createSignal<string | null>(null);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [showQRScanner, setShowQRScanner] = createSignal(false);
  const [isCheckingIn, setIsCheckingIn] = createSignal(false);

  const handleAttendanceAction = (checkingIn: boolean) => {
    setIsCheckingIn(checkingIn);
    setShowQRScanner(true);
  };

  const handleQRScan = async (qrCode: string) => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, name")
        .eq("qr_code", qrCode)
        .single();

      if (error) throw error;

      if (data) {
        setEmployeeName(data.name);
        setEmployeeId(data.id);
        await recordAttendance(data.id);
      } else {
        setError("従業員情報が見つかりません。");
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("処理中にエラーが発生しました。");
    } finally {
      setShowQRScanner(false);
    }
  };

  const recordAttendance = async (employeeId: string) => {
    try {
      const { error: attendanceError } = await supabase
        .from("attendance_records")
        .insert({
          employee_id: employeeId,
          [isCheckingIn() ? "check_in" : "check_out"]: new Date().toISOString(),
        });

      if (attendanceError) throw attendanceError;

      console.log(
        `${employeeName()}さんの${
          isCheckingIn() ? "出勤" : "退勤"
        }が完了しました。`
      );
    } catch (err) {
      console.error("勤怠記録の作成に失敗しました:", err);
      setError("勤怠記録の作成に失敗しました。");
    }
  };

  const handleQRError = (error: string) => {
    setError(error);
  };

  const handleBack = () => {
    // 新しく追加
    setShowQRScanner(false);
    setError(null);
  };

  return (
    <div>
      <h1>勤怠管理システム</h1>
      {!showQRScanner() ? (
        <div>
          <button onClick={() => handleAttendanceAction(true)}>出勤する</button>
          <button onClick={() => handleAttendanceAction(false)}>
            退勤する
          </button>
          <A href="/admin/login">管理者ログイン</A>
        </div>
      ) : (
        <QRScanner
          onScan={handleQRScan}
          onError={handleQRError}
          onBack={handleBack}
        />
      )}
      {employeeId() && <AlertDialog employeeId={employeeId()!} />}
      {employeeName() && <p>従業員名: {employeeName()}</p>}
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default Home;
