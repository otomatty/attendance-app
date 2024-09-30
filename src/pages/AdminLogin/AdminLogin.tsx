import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { supabase } from "../../lib/supabase";

const AdminLogin: Component = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      });

      if (error) throw error;

      if (data.user) {
        // ログイン成功時、管理者ダッシュボードへリダイレクト
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("ログインエラー:", err);
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  };

  return (
    <div class="admin-login">
      <h1>管理者ログイン</h1>
      <form onSubmit={handleLogin}>
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
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default AdminLogin;
