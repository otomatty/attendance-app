import { Component, Show, createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const ProtectedAdminRoute: Component<{ children: any }> = (props) => {
  const { isAdmin, checkAdminStatus } = useAdminAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = createSignal(true);

  createEffect(async () => {
    setIsChecking(true);
    await checkAdminStatus();
    setIsChecking(false);
    if (!isAdmin()) {
      navigate("/admin/login", { replace: true });
    }
  });

  return (
    <Show when={!isChecking()} fallback={<div>権限を確認中...</div>}>
      <Show
        when={isAdmin()}
        fallback={<div>アクセス権限がありません。リダイレクトします...</div>}
      >
        {props.children}
      </Show>
    </Show>
  );
};

export default ProtectedAdminRoute;
