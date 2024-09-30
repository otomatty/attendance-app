import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { supabase } from "../../lib/supabase";
import QRScanner from "../../components/QRScanner/QRScanner";
import FaceCapture from "./components/FaceCapture";
import AlertDialog from "./components/AlertDialog";

const Home: Component = () => {
  const [employeeId, setEmployeeId] = createSignal<string | null>(null);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [showQRScanner, setShowQRScanner] = createSignal(false);
  const [isCheckingIn, setIsCheckingIn] = createSignal(false);
  const [captureImage, setCaptureImage] = createSignal(false);

  const handleAttendanceAction = (checkingIn: boolean) => {
    setIsCheckingIn(checkingIn);
    setShowQRScanner(true);
  };

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
        setEmployeeId(data.id);

        // 顔写真撮影をトリガー
        setCaptureImage(true);

        // 打刻処理
        const { error: attendanceError } = await supabase
          .from("attendance_records")
          .insert({
            employee_id: data.id,
            [isCheckingIn() ? "check_in" : "check_out"]:
              new Date().toISOString(),
          });

        if (attendanceError) throw attendanceError;

        console.log(
          `${data.name}さんの${
            isCheckingIn() ? "出勤" : "退勤"
          }が完了しました。`
        );

        // QRスキャナーを非表示にする
        setShowQRScanner(false);
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

  const handleImageCapture = (imageData: string) => {
    // ここで撮影した画像を処理します（例：サーバーにアップロードするなど）
    console.log("顔写真を撮影しました:", imageData);
    setCaptureImage(false);
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
        <div>
          <QRScanner onScan={handleQRScan} onError={handleQRError} />
          <FaceCapture
            onCapture={handleImageCapture}
            trigger={captureImage()}
          />
        </div>
      )}
      {employeeId() && <AlertDialog employeeId={employeeId()!} />}
      {employeeName() && <p>従業員名: {employeeName()}</p>}
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default Home;
