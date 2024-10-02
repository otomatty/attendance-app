import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { container, title, description, buttonGroup, button } from "./Home.css";

const Home: Component = () => {
  return (
    <div class={container}>
      <h1 class={title}>勤怠管理システムへようこそ</h1>
      <p class={description}>
        効率的な勤怠管理で、生産性の向上と従業員満足度の改善を実現します。
      </p>
      <div class={buttonGroup}>
        <A href="/company/register" class={button}>
          企業登録
        </A>
        <A href="/admin/login" class={button}>
          管理者ログイン
        </A>
        <A href="/employee/attendance" class={button}>
          従業員出退勤
        </A>
      </div>
    </div>
  );
};

export default Home;
