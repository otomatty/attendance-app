import {
  createContext,
  useContext,
  JSX,
  createSignal,
  createEffect,
} from "solid-js";
import { supabase } from "../lib/supabase";

interface AdminAuthContextValue {
  isAdmin: () => boolean;
  checkAdminStatus: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue>();

export function AdminAuthProvider(props: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = createSignal(false);

  const checkAdminStatus = async () => {
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
        console.error("Admin status check failed:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(data.is_admin);
      }
    } else {
      setIsAdmin(false);
    }
  };

  createEffect(() => {
    checkAdminStatus();
  });

  return (
    <AdminAuthContext.Provider
      value={{ isAdmin: () => isAdmin(), checkAdminStatus }}
    >
      {props.children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
