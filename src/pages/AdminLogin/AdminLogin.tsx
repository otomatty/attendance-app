import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { supabase } from "../../lib/supabase";
import QRScanner from "../../components/QRScanner/QRScanner";

// 一時パスワード生成関数を追加
function generateTempPassword(): string {
  return (
    Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
  );
}

const AdminLogin: Component = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [showQRScanner, setShowQRScanner] = createSignal(false);
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e: Event) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });

      if (error) throw error;

      if (data.user) {
        // 管理者権限の確認
        const { data: adminData, error: adminError } = await supabase
          .from("employees")
          .select("is_admin")
          .eq("id", data.user.id)
          .single();

        if (adminError) throw adminError;

        if (adminData && adminData.is_admin) {
          navigate("/admin/dashboard");
        } else {
          throw new Error("管理者権限がありません。");
        }
      }
    } catch (err) {
      console.error("ログインエラー:", err);
      setError("ログインに失敗しました。認証情報を確認してください。");
    }
  };

  const handleQRLogin = async (employeeId: string) => {
    setError(null);

    try {
      // 従業員情報と管理者権限を確認
      const { data, error } = await supabase
        .from("employees")
        .select("id, email, is_admin")
        .eq("id", employeeId)
        .single();

      if (error) throw error;

      if (data && data.is_admin) {
        // 管理者権限がある場合、一時的なパスワードでサインイン
        const tempPassword = generateTempPassword();
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: data.email,
            password: tempPassword,
          }
        );

        if (authError) throw authError;

        if (authData.user) {
          // サインアップ成功後、すぐにサインイン
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: data.email,
              password: tempPassword,
            });

          if (signInError) throw signInError;

          if (signInData.user && signInData.session) {
            // セッション情報を保存するなどの処理を行う
            console.log("ログイン成功:", signInData.user.email);

            // ログイン成功、ダッシュボードへリダイレクト
            navigate("/admin/dashboard");
          } else {
            throw new Error("セッションの作成に失敗しました。");
          }
        } else {
          throw new Error("認証に失敗しました。");
        }
      } else {
        throw new Error("管理者権限がありません。");
      }
    } catch (err) {
      console.error("QRログインエラー:", err);
      setError("ログインに失敗しました。QRコードを確認してください。");
    }
  };

  return (
    <div class="admin-login">
      <h1>管理者ログイン</h1>
      {showQRScanner() ? (
        <QRScanner onScan={handleQRLogin} />
      ) : (
        <form onSubmit={handleEmailPasswordLogin}>
          <div>
            <label for="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label for="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              required
            />
          </div>
          <button type="submit">ログイン</button>
        </form>
      )}
      <button onClick={() => setShowQRScanner(!showQRScanner())}>
        {showQRScanner()
          ? "メール/パスワードログインに切り替え"
          : "QRコードログインに切り替え"}
      </button>
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default AdminLogin;
