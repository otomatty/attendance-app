import { Component, createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import { getEmployeeByQRCode } from "../../lib/supabase/employees";
import { createAttendanceRecord } from "../../lib/supabase/attendance";
import QRScanner from "../../components/QRScanner/QRScanner";
import AlertDialog from "./components/AlertDialog/AlertDialog";
import {
  container,
  title,
  buttonContainer,
  button,
  checkInButton,
  checkOutButton,
  adminLink,
  employeeNameClass,
  errorClass,
} from "./EmployeeAttendance.css";

const EmployeeAttendance: Component = () => {
  const [employeeId, setEmployeeId] = createSignal<string | null>(null);
  const [employeeName, setEmployeeName] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [showQRScanner, setShowQRScanner] = createSignal(false);
  const [isCheckingIn, setIsCheckingIn] = createSignal(false);

  const handleAttendanceAction = (checkingIn: boolean) => {
    setIsCheckingIn(checkingIn);
    setShowQRScanner(true);
  };

  const handleQRScan = async (qrCode: string) => {
    try {
      const employee = await getEmployeeByQRCode(qrCode);

      if (employee) {
        setEmployeeName(employee.first_name + " " + employee.last_name);
        setEmployeeId(employee.id);
        await recordAttendance(employee.id);
      } else {
        setError("従業員情報が見つかりません。");
      }
    } catch (err) {
      console.error("エラーが発生しました:", err);
      setError("処理中にエラーが発生しました。");
    } finally {
      setShowQRScanner(false);
    }
  };

  const recordAttendance = async (employeeId: string) => {
    try {
      await createAttendanceRecord({
        employee_id: employeeId,
        [isCheckingIn() ? "check_in" : "check_out"]: new Date().toISOString(),
      });
      console.log(
        `${employeeName()}さんの${
          isCheckingIn() ? "出勤" : "退勤"
        }が完了しました。`
      );
    } catch (err) {
      console.error("勤怠記録の作成に失敗しました:", err);
      setError("勤怠記録の作成に失敗しました。");
    }
  };

  const handleQRError = (error: string) => {
    setError(error);
  };

  const handleBack = () => {
    setShowQRScanner(false);
    setError(null);
  };

  return (
    <div class={container}>
      <h1 class={title}>勤怠管理システム</h1>
      <Show
        when={!showQRScanner()}
        fallback={
          <QRScanner
            onScan={handleQRScan}
            onError={handleQRError}
            onBack={handleBack}
          />
        }
      >
        <div class={buttonContainer}>
          <button
            class={`${button} ${checkInButton}`}
            onClick={() => handleAttendanceAction(true)}
          >
            出勤する
          </button>
          <button
            class={`${button} ${checkOutButton}`}
            onClick={() => handleAttendanceAction(false)}
          >
            退勤する
          </button>
        </div>
      </Show>
      <Show when={employeeId()}>
        <AlertDialog employeeId={employeeId()!} />
      </Show>
      <Show when={employeeName()}>
        <p class={employeeNameClass}>従業員名: {employeeName()}</p>
      </Show>
      <Show when={error()}>
        <p class={errorClass}>{error()}</p>
      </Show>
      <A href="/admin/login" class={adminLink}>
        管理者ログイン
      </A>
    </div>
  );
};

export default EmployeeAttendance;
