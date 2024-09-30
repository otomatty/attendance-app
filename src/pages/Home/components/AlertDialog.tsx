import { Component, createSignal, Show } from "solid-js";

const AlertDialog: Component = () => {
  const [showAlert, setShowAlert] = createSignal(false);

  // 実際のアプリケーションでは、この関数は外部から呼び出されるか、
  // 定期的にチェックするロジックが必要です
  const checkAndShowAlert = () => {
    // TODO: 実際の打刻忘れチェックロジックを実装
    setShowAlert(true);
  };

  const handleOption = (option: string) => {
    console.log(`選択されたオプション: ${option}`);
    // TODO: 選択されたオプションに応じた処理を実装
    setShowAlert(false);
  };

  return (
    <Show when={showAlert()}>
      <div class="alert-dialog">
        <h3>打刻忘れの可能性があります</h3>
        <p>以下のオプションから選択してください：</p>
        <button onClick={() => handleOption("打刻忘れ - 今すぐ打刻")}>
          打刻忘れ - 今すぐ打刻
        </button>
        <button onClick={() => handleOption("問題なし - 休暇中/出張中")}>
          問題なし - 休暇中/出張中
        </button>
        <button onClick={() => handleOption("後で確認")}>後で確認</button>
      </div>
    </Show>
  );
};

export default AlertDialog;
