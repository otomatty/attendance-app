import { Component, createSignal, onMount } from "solid-js";
import { supabase } from "../../../lib/supabase";

const MaxWorkHoursSetting: Component = () => {
  const [maxWorkHours, setMaxWorkHours] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "max_work_hours")
        .single();

      if (error) throw error;
      setMaxWorkHours(data.value);
    } catch (err) {
      console.error("設定の取得に失敗しました:", err);
      setError("設定の取得に失敗しました。");
    }
  });

  const updateMaxWorkHours = async (e: Event) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("settings")
        .update({ value: maxWorkHours() })
        .eq("key", "max_work_hours");

      if (error) throw error;
      alert("最大勤務時間が更新されました。");
    } catch (err) {
      console.error("設定の更新に失敗しました:", err);
      setError("設定の更新に失敗しました。");
    }
  };

  return (
    <div class="max-work-hours-setting">
      <h3>最大勤務時間設定</h3>
      <form onSubmit={updateMaxWorkHours}>
        <input
          type="number"
          value={maxWorkHours()}
          onInput={(e) => setMaxWorkHours(e.currentTarget.value)}
          min="1"
          step="0.5"
          required
        />
        <button type="submit">更新</button>
      </form>
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default MaxWorkHoursSetting;
