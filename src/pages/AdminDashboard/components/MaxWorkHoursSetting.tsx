import { Component, createSignal, createEffect } from "solid-js";
import { supabase } from "../../../lib/supabase";

const MaxWorkHoursSetting: Component = () => {
  const [maxWorkHours, setMaxWorkHours] = createSignal<number>(8);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "max_work_hours")
        .single();

      if (error) throw error;

      if (data) {
        setMaxWorkHours(Number(data.value));
      }
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
      const { error } = await supabase
        .from("settings")
        .upsert({ key: "max_work_hours", value: maxWorkHours().toString() });

      if (error) throw error;

      console.log("最大勤務時間を更新しました。");
    } catch (err) {
      console.error("最大勤務時間の更新に失敗しました:", err);
      setError("最大勤務時間の更新に失敗しました。");
    }
  };

  return (
    <div class="max-work-hours-setting">
      <h2>最大勤務時間設定</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label for="max-work-hours">最大勤務時間 (時間):</label>
          <input
            id="max-work-hours"
            type="number"
            min="1"
            max="24"
            value={maxWorkHours()}
            onInput={(e) => setMaxWorkHours(Number(e.currentTarget.value))}
            required
          />
          <button type="submit">更新</button>
        </form>
      )}
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default MaxWorkHoursSetting;
