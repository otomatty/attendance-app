import { Component, createSignal, createEffect } from "solid-js";
import { getAttendanceEditHistory } from "../../../../lib/supabase/settings";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { container, title, table, th, td } from "./EditHistory.css";

interface EditHistoryProps {
  employeeId: string;
}

const EditHistory: Component<EditHistoryProps> = (props) => {
  const [editHistory, setEditHistory] = createSignal<any[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const history = await getAttendanceEditHistory(props.employeeId);
      setEditHistory(history);
    } catch (err) {
      console.error("編集履歴の取得に失敗しました:", err);
      setError("編集履歴の取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div class={container}>
      <h2 class={title}>編集履歴</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <table class={table}>
          <thead>
            <tr>
              <th class={th}>編集日時</th>
              <th class={th}>編集者</th>
              <th class={th}>旧出勤時間</th>
              <th class={th}>旧退勤時間</th>
              <th class={th}>新出勤時間</th>
              <th class={th}>新退勤時間</th>
              <th class={th}>理由</th>
            </tr>
          </thead>
          <tbody>
            {editHistory().map((record) => (
              <tr>
                <td class={td}>
                  {new Date(record.created_at).toLocaleString()}
                </td>
                <td class={td}>{record.edited_by}</td>
                <td class={td}>
                  {new Date(record.old_check_in).toLocaleString()}
                </td>
                <td class={td}>
                  {record.old_check_out
                    ? new Date(record.old_check_out).toLocaleString()
                    : "-"}
                </td>
                <td class={td}>
                  {new Date(record.new_check_in).toLocaleString()}
                </td>
                <td class={td}>
                  {record.new_check_out
                    ? new Date(record.new_check_out).toLocaleString()
                    : "-"}
                </td>
                <td class={td}>{record.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ErrorMessage message={error()} />
    </div>
  );
};

export default EditHistory;
