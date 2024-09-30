import { Component } from "solid-js";
import QRScanner from "./components/QRScanner";
import FaceCapture from "./components/FaceCapture";
import AlertDialog from "./components/AlertDialog";

const Home: Component = () => {
  return (
    <div>
      <h1>勤怠管理システム</h1>
      <QRScanner />
      <FaceCapture />
      <AlertDialog />
    </div>
  );
};

export default Home;
