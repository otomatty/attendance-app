import { Component, createSignal, onMount } from "solid-js";

const FaceCapture: Component = () => {
  let videoRef: HTMLVideoElement | undefined;
  let canvasRef: HTMLCanvasElement | undefined;
  const [capturedImage, setCapturedImage] = createSignal<string | null>(null);

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
        });
    }
  });

  const captureImage = () => {
    if (videoRef && canvasRef) {
      const context = canvasRef.getContext("2d");
      if (context) {
        context.drawImage(videoRef, 0, 0, 640, 480);
        const imageDataUrl = canvasRef.toDataURL("image/jpeg");
        setCapturedImage(imageDataUrl);
        // TODO: 撮影した画像をサーバーにアップロードする処理を追加
      }
    }
  };

  return (
    <div>
      <h2>顔写真撮影</h2>
      <video ref={videoRef} width="640" height="480" autoplay></video>
      <button onClick={captureImage}>撮影</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style="display: none;"
      ></canvas>
      {capturedImage() && <img src={capturedImage()} alt="Captured face" />}
    </div>
  );
};

export default FaceCapture;
