import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
// import { supabase } from "../../lib/supabase";
import QRScanner from "../../components/QRScanner/QRScanner";

const AdminLogin: Component = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);
  const [showQRScanner, setShowQRScanner] = createSignal(false);
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e: Event) => {
    e.preventDefault();
    setError(null);
    // 開発段階では、どんな認証情報でもログインを許可します
    navigate("/admin/dashboard");

    // 本番環境用の認証ロジックはコメントアウトしています
    /*
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
    */
  };

  const handleQRScan = async (decodedText: string) => {
    setError(null);
    // 開発段階では、QRコードの内容に関わらずログインを許可します
    navigate("/admin/dashboard");

    // 以下の認証ロジックはコメントアウトしています
    /*
    try {
      // 従業員情報と管理者権限を確認
      const { data, error } = await supabase
        .from("employees")
        .select("id, email, is_admin")
        .eq("qr_code", decodedText)
        .single();

      if (error) throw error;

      if (data && data.is_admin) {
        // 管理者権限がある場合、ダッシュボードへリダイレクト
        navigate("/admin/dashboard");
      } else {
        throw new Error("管理者権限がありません。");
      }
    } catch (err) {
      console.error("QRログインエラー:", err);
      setError("ログインに失敗しました。QRコードを確認してください。");
    }
    */
  };

  const handleQRError = (error: string) => {
    setError(error);
  };

  const handleBack = () => {
    setShowQRScanner(false);
    setError(null);
  };

  const handleSkipLogin = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div class="admin-login">
      <h1>管理者ログイン</h1>
      {showQRScanner() ? (
        <QRScanner
          onScan={handleQRScan}
          onError={handleQRError}
          onBack={handleBack}
        />
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
      <button onClick={handleSkipLogin}>ログインをスキップ</button>
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default AdminLogin;
