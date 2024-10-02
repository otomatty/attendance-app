import { Component, createSignal } from "solid-js";
import {
  container,
  title,
  input,
  button,
  step,
  stepTitle,
} from "./InitialSetup.css";

interface InitialSetupProps {
  onComplete: () => void;
}

const InitialSetup: Component<InitialSetupProps> = (props) => {
  const [department, setDepartment] = createSignal("");
  const [workHours, setWorkHours] = createSignal("");
  const [holidays, setHolidays] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // ここで初期設定の保存処理を行う
    // 例: await saveInitialSetup({ department: department(), workHours: workHours(), holidays: holidays() });
    props.onComplete();
  };

  return (
    <div class={container}>
      <h2 class={title}>初期設定</h2>
      <form onSubmit={handleSubmit}>
        <div class={step}>
          <h3 class={stepTitle}>部門設定</h3>
          <input
            class={input}
            type="text"
            value={department()}
            onInput={(e) => setDepartment(e.currentTarget.value)}
            placeholder="部門名をカンマ区切りで入力"
          />
        </div>
        <div class={step}>
          <h3 class={stepTitle}>勤務時間設定</h3>
          <input
            class={input}
            type="text"
            value={workHours()}
            onInput={(e) => setWorkHours(e.currentTarget.value)}
            placeholder="例: 9:00-18:00"
          />
        </div>
        <div class={step}>
          <h3 class={stepTitle}>休日カレンダー設定</h3>
          <input
            class={input}
            type="text"
            value={holidays()}
            onInput={(e) => setHolidays(e.currentTarget.value)}
            placeholder="休日をカンマ区切りで入力 (例: 2023-05-01,2023-05-03)"
          />
        </div>
        <button class={button} type="submit">
          設定を完了する
        </button>
      </form>
    </div>
  );
};

export default InitialSetup;
