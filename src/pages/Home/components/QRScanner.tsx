import { Component, onMount, onCleanup, createSignal } from "solid-js";
import { Html5QrcodeScanner } from "html5-qrcode";
import { supabase } from "../../../lib/supabase";

const QRScanner: Component = () => {
  let qrScanner: Html5QrcodeScanner;
  const [scanResult, setScanResult] = createSignal<string | null>(null);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const onScanSuccess = async (decodedText: string, decodedResult: any) => {
    console.log(`QRコードをスキャンしました: ${decodedText}`, decodedResult);
    setScanResult(decodedText);

    try {
      // 従業員情報の取得（idも含める）
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

  const onScanFailure = (error: any) => {
    console.warn(`QRコードのスキャンに失敗しました: ${error}`);
    setError("QRコードのスキャンに失敗しました。");
  };

  onMount(() => {
    qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    qrScanner.render(onScanSuccess, onScanFailure);
  });

  onCleanup(() => {
    if (qrScanner) {
      qrScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }
  });

  return (
    <div class="qr-scanner">
      <h2>QRコードスキャン</h2>
      <div id="qr-reader" style="width: 500px; margin: 0 auto;"></div>
      {scanResult() && (
        <div class="scan-result">
          <p>スキャン結果: {scanResult()}</p>
          {employeeName() && <p>従業員名: {employeeName()}</p>}
          {error() && <p class="error">{error()}</p>}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
