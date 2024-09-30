import { Component } from "solid-js";
import { A } from "@solidjs/router";

const Navigation: Component = () => {
  return (
    <nav>
      <ul>
        <li>
          <A href="/">ホーム</A>
        </li>
        <li>
          <A href="/admin/login">管理者ログイン</A>
        </li>
        <li>
          <A href="/admin/dashboard">管理者ダッシュボード</A>
        </li>
        <li>
          <A href="/admin/attendance/edit">勤怠記録編集</A>
        </li>
        <li>
          <A href="/admin/reports">レポート</A>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
