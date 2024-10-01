import { Component, createSignal, createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

const EmployeeManagement: Component = () => {
  const [employees, setEmployees] = createStore<Employee[]>([]);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    // TODO: APIから従業員データを取得する
    // 仮のデータをセット
    setEmployees([
      {
        id: 1,
        name: "山田太郎",
        email: "yamada@example.com",
        position: "マネージャー",
      },
      {
        id: 2,
        name: "佐藤花子",
        email: "sato@example.com",
        position: "エンジニア",
      },
    ]);
    setLoading(false);
  });

  return (
    <div>
      <h1>従業員管理</h1>
      {loading() ? (
        <p>読み込み中...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>役職</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <For each={employees}>
              {(employee) => (
                <tr>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>編集</button>
                    <button onClick={() => handleDelete(employee.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      )}
      <button onClick={handleAdd}>新規従業員追加</button>
    </div>
  );
};

const handleEdit = (employee: Employee) => {
  // TODO: 編集機能を実装
  console.log("編集:", employee);
};

const handleDelete = (id: number) => {
  // TODO: 削除機能を実装
  console.log("削除:", id);
};

const handleAdd = () => {
  // TODO: 追加機能を実装
  console.log("新規従業員追加");
};

export default EmployeeManagement;
