import { Component } from "solid-js";
import { A } from "@solidjs/router";
import { adminHeader, nav, ul, li, link } from "./AdminHeader.css";

const AdminHeader: Component = () => {
  return (
    <header class={adminHeader}>
      <nav class={nav}>
        <ul class={ul}>
          <li class={li}>
            <A href="/admin/dashboard" class={link}>
              ダッシュボード
            </A>
          </li>
          <li class={li}>
            <A href="/admin/employees" class={link}>
              従業員管理
            </A>
          </li>
          <li class={li}>
            <A href="/admin/attendance" class={link}>
              勤怠管理
            </A>
          </li>
          <li class={li}>
            <A href="/admin/reports" class={link}>
              レポート
            </A>
          </li>
          <li class={li}>
            <A href="/" class={link}>
              ホームに戻る
            </A>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
