import { Component, createSignal, createEffect, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const ProtectedAdminRoute: Component<{ component: Component }> = (props) => {
  const [isChecked, setIsChecked] = createSignal<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const isDevelopment = import.meta.env.DEV;

  createEffect(() => {
    if (isDevelopment) {
      setIsChecked(true);
      setIsAuthenticated(true);
    } else {
      const checkAuth = async () => {
        try {
          const { isAdmin, checkAdminStatus } = useAdminAuth();
          await checkAdminStatus();
          setIsAuthenticated(isAdmin());
        } catch (error) {
          console.error("認証チェックエラー:", error);
          setIsAuthenticated(false);
        } finally {
          setIsChecked(true);
        }
      };
      checkAuth();
    }
  });

  return (
    <Show when={isChecked()}>
      {isAuthenticated() ? (
        <props.component />
      ) : (
        <Navigate href="/admin/login" />
      )}
    </Show>
  );
};

export default ProtectedAdminRoute;
