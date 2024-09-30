import { Component, createSignal } from "solid-js";

const AdminLogin: Component = () => {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = (e: Event) => {
    e.preventDefault();
    // TODO: ログイン処理を実装
    console.log("Login attempt:", username(), password());
  };

  return (
    <div>
      <h1>管理者ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username()}
          onInput={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default AdminLogin;
