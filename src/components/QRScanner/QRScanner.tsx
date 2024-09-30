import { Component, onMount, onCleanup, createSignal } from "solid-js";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  onError?: (error: string) => void;
}

const QRScanner: Component<QRScannerProps> = (props) => {
  let qrScanner: Html5QrcodeScanner;
  const [scanResult, setScanResult] = createSignal<string | null>(null);

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`QRコードをスキャンしました: ${decodedText}`, decodedResult);
    setScanResult(decodedText);
    props.onScan(decodedText);
  };

  const onScanFailure = (error: any) => {
    console.warn(`QRコードのスキャンに失敗しました: ${error}`);
    if (props.onError) {
      props.onError("QRコードのスキャンに失敗しました。");
    }
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
      <h2>QRコードをスキャンしてください</h2>
      <div id="qr-reader" style="width: 500px; margin: 0 auto;"></div>
      {scanResult() && (
        <div class="scan-result">
          <p>スキャン結果: {scanResult()}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
