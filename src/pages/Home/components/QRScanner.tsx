import { Component, onMount, onCleanup } from "solid-js";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner: Component = () => {
  let qrScanner: Html5QrcodeScanner;

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`QRコードをスキャンしました: ${decodedText}`, decodedResult);
    // TODO: スキャン結果を処理する（例：従業員情報の取得、打刻処理など）
  };

  const onScanFailure = (error: any) => {
    console.warn(`QRコードのスキャンに失敗しました: ${error}`);
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
    <div>
      <h2>QRコードスキャン</h2>
      <div id="qr-reader" style="width: 500px"></div>
    </div>
  );
};

export default QRScanner;
