import { Component, createSignal, createEffect, Show } from "solid-js";
import { getEmployeesWithAttendance } from "../../../../lib/supabase/employees";
import { EmployeeWithAttendance } from "../../../../types/employee";
import QRCodeGenerator from "../../../../components/QRCodeGenerator/QRCodeGenerator";
import {
  container,
  title,
  table,
  th,
  td,
  button,
  errorMessage,
} from "./EmployeeList.css";

const EmployeeList: Component = () => {
  const [employees, setEmployees] = createSignal<EmployeeWithAttendance[]>([]);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] =
    createSignal<EmployeeWithAttendance | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = createSignal(false);

  createEffect(async () => {
    try {
      const data = await getEmployeesWithAttendance();
      setEmployees(data);
    } catch (err) {
      console.error("従業員リストの取得に失敗しました:", err);
      setError("従業員リストの取得に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  });

  const formatTime = (time: string | null) => {
    return time ? new Date(time).toLocaleTimeString() : "-";
  };

  const generateQRCode = (employee: EmployeeWithAttendance) => {
    setSelectedEmployee(employee);
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div class={container}>
      <h2 class={title}>従業員リスト</h2>
      {isLoading() ? (
        <p>読み込み中...</p>
      ) : (
        <table class={table}>
          <thead>
            <tr>
              <th class={th}>名前</th>
              <th class={th}>出勤状態</th>
              <th class={th}>出勤時間</th>
              <th class={th}>退勤時間</th>
              <th class={th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {employees().map((employee) => (
              <tr>
                <td class={td}>{employee.name}</td>
                <td class={td}>{employee.is_working ? "出勤中" : "退勤中"}</td>
                <td class={td}>{formatTime(employee.check_in_time)}</td>
                <td class={td}>{formatTime(employee.check_out_time)}</td>
                <td class={td}>
                  <button
                    class={button}
                    onClick={() => generateQRCode(employee)}
                  >
                    QRコード生成
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error() && <p class={errorMessage}>{error()}</p>}
      <Show when={isQRModalOpen() && selectedEmployee()}>
        <QRCodeGenerator
          employeeId={selectedEmployee()!.id}
          employeeName={selectedEmployee()!.name}
          isOpen={isQRModalOpen()}
          onClose={handleCloseQRModal}
        />
      </Show>
    </div>
  );
};

export default EmployeeList;
