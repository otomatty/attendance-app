import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { container, title, message, link } from "./RegistrationComplete.css";

const RegistrationComplete: Component = () => {
  return (
    <div class={container}>
      <h2 class={title}>登録完了</h2>
      <p class={message}>
        企業登録が完了しました。ダッシュボードから勤怠管理を始めることができます。
      </p>
      <A href="/dashboard" class={link}>
        ダッシュボードへ
      </A>
    </div>
  );
};

export default RegistrationComplete;
