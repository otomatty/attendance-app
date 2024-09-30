import { Component, createSignal, createEffect } from "solid-js";
import { supabase } from "../../../lib/supabase";

interface EditRecord {
  id: string;
  employee_id: string;
  edited_at: string;
  edited_by: string;
  old_check_in: string;
  old_check_out: string | null;
  new_check_in: string;
  new_check_out: string | null;
}

const EditHistory: Component = () => {
  const [editHistory, setEditHistory] = createSignal<EditRecord[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const { data, error } = await supabase
        .from("attendance_edit_history")
        .select("*")
        .order("edited_at", { ascending: false })
        .limit(10);

      if (error) throw error;

      setEditHistory(data as EditRecord[]);
    } catch (err) {
      console.error("編集履歴の取得に失敗しました:", err);
      setError("編集履歴の取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div class="edit-history">
      <h2>最近の編集履歴</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>従業員ID</th>
              <th>編集日時</th>
              <th>編集者</th>
              <th>旧出勤時間</th>
              <th>旧退勤時間</th>
              <th>新出勤時間</th>
              <th>新退勤時間</th>
            </tr>
          </thead>
          <tbody>
            {editHistory().map((record) => (
              <tr>
                <td>{record.employee_id}</td>
                <td>{new Date(record.edited_at).toLocaleString()}</td>
                <td>{record.edited_by}</td>
                <td>{new Date(record.old_check_in).toLocaleString()}</td>
                <td>
                  {record.old_check_out
                    ? new Date(record.old_check_out).toLocaleString()
                    : "-"}
                </td>
                <td>{new Date(record.new_check_in).toLocaleString()}</td>
                <td>
                  {record.new_check_out
                    ? new Date(record.new_check_out).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error() && <p class="error">{error()}</p>}
    </div>
  );
};

export default EditHistory;
