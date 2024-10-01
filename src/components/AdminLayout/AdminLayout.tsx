import { Component } from "solid-js";
import AdminHeader from "../AdminHeader/AdminHeader";

const AdminLayout: Component<{ children: any }> = (props) => {
  return (
    <div class="admin-layout">
      <AdminHeader />
      <main>{props.children}</main>
    </div>
  );
};

export default AdminLayout;
