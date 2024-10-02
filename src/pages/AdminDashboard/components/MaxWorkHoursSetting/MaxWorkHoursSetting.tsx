import { Component, createSignal, createEffect } from "solid-js";
import {
  getMaxWorkHours,
  updateMaxWorkHours,
} from "../../../../lib/supabase/settings";
import {
  container,
  title,
  form,
  input,
  button,
  errorMessage,
} from "./MaxWorkHoursSetting.css";

const MaxWorkHoursSetting: Component = () => {
  const [maxWorkHours, setMaxWorkHours] = createSignal<number>(8);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const hours = await getMaxWorkHours();
      setMaxWorkHours(hours);
    } catch (err) {
      console.error("最大勤務時間の取得に失敗しました:", err);
      setError("最大勤務時間の取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    try {
      await updateMaxWorkHours(maxWorkHours());
      console.log("最大勤務時間を更新しました。");
    } catch (err) {
      console.error("最大勤務時間の更新に失敗しました:", err);
      setError("最大勤務時間の更新に失敗しました。");
    }
  };

  return (
    <div class={container}>
      <h2 class={title}>最大勤務時間設定</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <form class={form} onSubmit={handleSubmit}>
          <label for="max-work-hours">最大勤務時間 (時間):</label>
          <input
            id="max-work-hours"
            class={input}
            type="number"
            min="1"
            max="24"
            value={maxWorkHours()}
            onInput={(e) => setMaxWorkHours(Number(e.currentTarget.value))}
            required
          />
          <button class={button} type="submit">
            更新
          </button>
        </form>
      )}
      {error() && <p class={errorMessage}>{error()}</p>}
    </div>
  );
};

export default MaxWorkHoursSetting;
