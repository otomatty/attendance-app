import { Component } from "solid-js";
import { A } from "@solidjs/router";

const AdminHeader: Component = () => {
  return (
    <header class="admin-header">
      <nav>
        <ul>
          <li>
            <A href="/admin/dashboard">ダッシュボード</A>
          </li>
          <li>
            <A href="/admin/employees">従業員管理</A>
          </li>
          <li>
            <A href="/admin/attendance">勤怠管理</A>
          </li>
          <li>
            <A href="/admin/reports">レポート</A>
          </li>
          <li>
            <A href="/">ホームに戻る</A>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
