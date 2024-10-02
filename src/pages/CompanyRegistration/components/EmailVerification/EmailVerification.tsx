import { Component, createSignal } from "solid-js";
import {
  container,
  title,
  message,
  resendButton,
  verifyButton,
} from "./EmailVerification.css";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

interface EmailVerificationProps {
  onVerified: () => void;
}

const EmailVerification: Component<EmailVerificationProps> = (props) => {
  const [isVerified, setIsVerified] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const handleVerification = async () => {
    try {
      // ここで実際のメール認証処理を行う
      // 例: await verifyEmail();
      setIsVerified(true);
      props.onVerified();
    } catch (err) {
      setError("メール認証に失敗しました。もう一度お試しください。");
    }
  };

  const handleResendEmail = async () => {
    try {
      // ここで認証メールの再送信処理を行う
      // 例: await resendVerificationEmail();
      setError(null);
      alert("認証メールを再送信しました。");
    } catch (err) {
      setError("メールの再送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div class={container}>
      <h2 class={title}>メール認証</h2>
      <p class={message}>
        登録したメールアドレスに認証リンクを送信しました。リンクをクリックして認証を完了してください。
      </p>
      {error() && <ErrorMessage message={error()} />}

      <button class={resendButton} onClick={handleResendEmail}>
        認証メールを再送信
      </button>
      <button class={verifyButton} onClick={handleVerification}>
        認証を完了する
      </button>
    </div>
  );
};

export default EmailVerification;
