import { Component, createSignal, createEffect, For } from "solid-js";
import {
  AttendanceRecord,
  AttendanceUpdateData,
} from "../../../../types/attendance";
import { EmployeeListItem } from "../../../../types/employee";
import { getAttendanceRecord } from "../../../../lib/supabase/attendance";
import { getEmployeesList } from "../../../../lib/supabase/employees";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import {
  form,
  formGroup,
  label,
  input,
  button,
  textarea,
  autocompleteContainer,
  autocompleteList,
  autocompleteItem,
} from "./AttendanceForm.css";

interface AttendanceFormProps {
  onSubmit: (record: AttendanceUpdateData) => void;
  onEmployeeSelect: (employeeId: string) => void;
}

const AttendanceForm: Component<AttendanceFormProps> = (props) => {
  const [employees, setEmployees] = createSignal<EmployeeListItem[]>([]);
  const [filteredEmployees, setFilteredEmployees] = createSignal<
    EmployeeListItem[]
  >([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [selectedEmployee, setSelectedEmployee] =
    createSignal<EmployeeListItem | null>(null);
  const [date, setDate] = createSignal("");
  const [checkIn, setCheckIn] = createSignal("");
  const [checkOut, setCheckOut] = createSignal("");
  const [reason, setReason] = createSignal("");
  const [attendanceRecord, setAttendanceRecord] =
    createSignal<AttendanceRecord | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  createEffect(async () => {
    try {
      const employeesList = await getEmployeesList();
      setEmployees(employeesList);
    } catch (err) {
      console.error("従業員リストの取得に失敗しました:", err);
      setError("従業員リストの取得に失敗しました。");
    }
  });

  const handleSearch = (e: Event) => {
    e.preventDefault();
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    setSearchTerm(term);
    if (term.length > 0) {
      const filtered = employees().filter((employee) =>
        employee.name.toLowerCase().includes(term)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const selectEmployee = (employee: EmployeeListItem) => {
    setSelectedEmployee(employee);
    setSearchTerm(employee.name);
    setFilteredEmployees([]);
    props.onEmployeeSelect(employee.id);
  };

  const handleAttendanceSearch = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (!selectedEmployee()) {
      setError("従業員を選択してください。");
      return;
    }

    try {
      const record = await getAttendanceRecord(selectedEmployee()!.id, date());
      if (record) {
        setAttendanceRecord(record);
        setCheckIn(
          new Date(record.check_in).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        setCheckOut(
          record.check_out
            ? new Date(record.check_out).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""
        );
      } else {
        setAttendanceRecord(null);
        setCheckIn("");
        setCheckOut("");
        setError("指定された日付の勤怠記録が見つかりません。");
      }
    } catch (err) {
      console.error("勤怠記録の検索に失敗しました:", err);
      setError("勤怠記録の検索に失敗しました。");
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!attendanceRecord()) {
      setError("編集する勤怠記録が選択されていません。");
      return;
    }

    const updatedRecord: AttendanceUpdateData = {
      check_in: `${date()}T${checkIn()}:00`,
      check_out: checkOut() ? `${date()}T${checkOut()}:00` : null,
      reason: reason(),
    };

    props.onSubmit(updatedRecord);
  };

  return (
    <div>
      <h2>勤怠記録編集フォーム</h2>
      <form class={form} onSubmit={handleAttendanceSearch}>
        <div class={formGroup}>
          <label class={label} for="employee">
            従業員:
          </label>
          <div class={autocompleteContainer}>
            <input
              class={input}
              type="text"
              id="employee"
              value={searchTerm()}
              onInput={handleSearch}
              placeholder="従業員名を入力"
              required
            />
            {filteredEmployees().length > 0 && (
              <ul class={autocompleteList}>
                <For each={filteredEmployees()}>
                  {(employee) => (
                    <li
                      class={autocompleteItem}
                      onClick={() => selectEmployee(employee)}
                    >
                      {employee.name}
                    </li>
                  )}
                </For>
              </ul>
            )}
          </div>
        </div>
        <div class={formGroup}>
          <label class={label} for="date">
            日付:
          </label>
          <input
            class={input}
            id="date"
            type="date"
            value={date()}
            onInput={(e) => setDate(e.currentTarget.value)}
            required
          />
        </div>
        <button class={button} type="submit">
          検索
        </button>
      </form>

      {attendanceRecord() && (
        <form class={form} onSubmit={handleSubmit}>
          <div class={formGroup}>
            <label class={label} for="check-in">
              出勤時間:
            </label>
            <input
              class={input}
              id="check-in"
              type="time"
              value={checkIn()}
              onInput={(e) => setCheckIn(e.currentTarget.value)}
              required
            />
          </div>
          <div class={formGroup}>
            <label class={label} for="check-out">
              退勤時間:
            </label>
            <input
              class={input}
              id="check-out"
              type="time"
              value={checkOut()}
              onInput={(e) => setCheckOut(e.currentTarget.value)}
            />
          </div>
          <div class={formGroup}>
            <label class={label} for="reason">
              編集理由:
            </label>
            <textarea
              class={textarea}
              id="reason"
              value={reason()}
              onInput={(e) => setReason(e.currentTarget.value)}
              required
            />
          </div>
          <button class={button} type="submit">
            更新
          </button>
        </form>
      )}

      <ErrorMessage message={error()} />
    </div>
  );
};

export default AttendanceForm;
