import { Component, createSignal, createEffect } from "solid-js";
import { supabase } from "../../../lib/supabase";

interface Employee {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

const EmployeeList: Component = () => {
  const [employees, setEmployees] = createSignal<Employee[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, name, email, is_admin");

      if (error) throw error;

      setEmployees(data as Employee[]);
    } catch (err) {
      console.error("従業員リストの取得に失敗しました:", err);
      setError("従業員リストの取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  });

  const toggleAdminStatus = async (
    employeeId: string,
    currentStatus: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("employees")
        .update({ is_admin: !currentStatus })
        .eq("id", employeeId);

      if (error) throw error;

      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId ? { ...emp, is_admin: !currentStatus } : emp
        )
      );
    } catch (err) {
      console.error("管理者権限の更新に失敗しました:", err);
      setError("管理者権限の更新に失敗しました。");
    }
  };

  return (
    <div class="employee-list">
      <h2>従業員リスト</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>管理者権限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {employees().map((employee) => (
              <tr>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.is_admin ? "あり" : "なし"}</td>
                <td>
                  <button
                    onClick={() =>
                      toggleAdminStatus(employee.id, employee.is_admin)
                    }
                  >
                    {employee.is_admin ? "権限を削除" : "権限を付与"}
                  </button>
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

export default EmployeeList;
