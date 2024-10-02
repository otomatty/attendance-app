import { Component, createSignal, createEffect } from "solid-js";
import QRCode from "qrcode";
import Modal from "../../components/Modal/Modal";
import {
  container,
  title,
  qrCodeImage,
  printButton,
} from "./QRCodeGenerator.css";

interface QRCodeGeneratorProps {
  employeeId: string;
  employeeName: string;
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeGenerator: Component<QRCodeGeneratorProps> = (props) => {
  const [qrCode, setQRCode] = createSignal<string | undefined>(undefined);

  createEffect(() => {
    if (props.isOpen) {
      generateQRCode(props.employeeId);
    }
  });

  const generateQRCode = async (employeeId: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(employeeId);
      setQRCode(qrCodeDataUrl);
    } catch (err) {
      console.error("QRコードの生成に失敗しました:", err);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${props.employeeName} QRコード</title>
            <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; }
              .container { text-align: center; }
              .qr-code { width: 200px; height: 200px; border: 1px solid #ddd; border-radius: 5px; padding: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>${props.employeeName}のQRコード</h2>
              <img src="${qrCode()}" alt="Employee QR Code" class="qr-code" />
            </div>
            <script>
              window.onload = () => {
                window.print();
                window.onafterprint = () => window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div class={container}>
        <h2 class={title}>{props.employeeName}のQRコード</h2>
        {qrCode() && (
          <>
            <img src={qrCode()} alt="Employee QR Code" class={qrCodeImage} />
            <button onClick={handlePrint} class={printButton}>
              印刷
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default QRCodeGenerator;
