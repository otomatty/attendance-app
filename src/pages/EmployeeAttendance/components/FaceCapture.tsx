import { Component, createSignal, onMount, Show, createEffect } from "solid-js";
import { supabase } from "../../../lib/supabase/client";

interface FaceCaptureProps {
  onCapture: (imageData: string) => void;
  trigger: boolean;
}

const FaceCapture: Component<FaceCaptureProps> = (props) => {
  let videoRef: HTMLVideoElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  const [capturedImage, setCapturedImage] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  onMount(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef) {
            videoRef.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("カメラへのアクセスに失敗しました:", error);
          setError("カメラへのアクセスに失敗しました。");
        });
    }
  });

  createEffect(() => {
    if (props.trigger) {
      captureImage();
    }
  });

  const captureImage = () => {
    if (videoRef && canvasRef) {
      const context = canvasRef.getContext("2d");
      if (context) {
        context.drawImage(videoRef, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        props.onCapture(imageDataUrl);
      }
    }
  };

  const uploadImage = async () => {
    if (!capturedImage()) {
      setError("画像が撮影されていません。");
      return;
    }

    try {
      const base64Data = capturedImage()!.split(",")[1];
      const fileName = `face_${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from("attendance_photos")
        .upload(fileName, decode(base64Data), {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      console.log("画像のアップロードが完了しました。");
      // TODO: アップロードされた画像のURLをattendance_recordsテーブルに保存する処理を追加
    } catch (err) {
      console.error("画像のアップロードに失敗しました:", err);
      setError("画像のアップロードに失敗しました。");
    }
  };

  // Base64デコード関数
  function decode(base64: string): Uint8Array {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  return (
    <div class="face-capture">
      <h2>顔写真撮影</h2>
      <video ref={videoRef} width="640" height="480" autoplay></video>
      <button onClick={captureImage}>撮影</button>
      <button onClick={uploadImage} disabled={!capturedImage()}>
        アップロード
      </button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style="display: none;"
      ></canvas>
      <Show when={capturedImage()}>
        <img src={capturedImage() || ""} alt="Captured face" />
      </Show>
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default FaceCapture;
