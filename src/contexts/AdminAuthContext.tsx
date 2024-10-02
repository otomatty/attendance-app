import { createContext, useContext, Component, createSignal } from "solid-js";
import { supabase } from "../lib/supabase/client";

interface AdminAuthContextType {
  isAdmin: () => boolean;
  checkAdminStatus: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>();

export const AdminAuthProvider: Component<{ children: any }> = (props) => {
  const [isAdmin, setIsAdmin] = createSignal(false);
  const isDevelopment = import.meta.env.DEV; // 開発環境かどうかを判定

  const checkAdminStatus = async () => {
    if (isDevelopment) {
      setIsAdmin(true); // 開発環境では常に管理者とみなす
      return;
    }

    // 本番環境用のチェックロジック
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("employees")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("管理者権限の確認に失敗しました:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(data?.is_admin || false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, checkAdminStatus }}>
      {props.children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext)!;
