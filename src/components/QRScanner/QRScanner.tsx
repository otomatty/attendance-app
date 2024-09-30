import { Component, onMount, onCleanup } from "solid-js";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  onScan: (employeeId: string) => void;
}

const QRScanner: Component<QRScannerProps> = (props) => {
  let qrScanner: Html5QrcodeScanner;

  const onScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`QRコードをスキャンしました: ${decodedText}`, decodedResult);
    props.onScan(decodedText);
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
      <h2>QRコードをスキャンしてください</h2>
      <div id="qr-reader" style="width: 500px"></div>
    </div>
  );
};

export default QRScanner;
