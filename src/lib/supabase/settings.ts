import { supabase } from "./client";

interface MaxWorkHoursSetting {
  id: number;
  max_hours: number;
}

interface Alert {
  id: string;
  employee_id: string;
  type: "on_leave" | "check_later";
  created_at: string;
}

interface AttendanceEdit {
  id: string;
  attendance_record_id: string;
  employee_id: string;
  old_check_in: string;
  old_check_out: string | null;
  new_check_in: string;
  new_check_out: string | null;
  reason: string;
  edited_by: string;
  created_at: string;
}

export async function getMaxWorkHours(): Promise<number> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "max_work_hours")
    .single();

  if (error) throw error;
  return Number(data.value);
}

export async function updateMaxWorkHours(hours: number): Promise<void> {
  const { error } = await supabase
    .from("settings")
    .upsert({ key: "max_work_hours", value: hours.toString() });

  if (error) throw error;
}

export async function createAlert(
  employeeId: string,
  type: "on_leave" | "check_later"
): Promise<Alert> {
  const { data, error } = await supabase
    .from("alerts")
    .insert({ employee_id: employeeId, type })
    .single();

  if (error) throw error;
  return data as Alert;
}

export async function createAttendanceEdit(
  edit: Omit<AttendanceEdit, "id" | "created_at">
): Promise<AttendanceEdit> {
  const { data, error } = await supabase
    .from("attendance_edits")
    .insert(edit)
    .single();

  if (error) throw error;
  return data as AttendanceEdit;
}

export async function getAttendanceEditHistory(
  employeeId: string
): Promise<AttendanceEdit[]> {
  const { data, error } = await supabase
    .from("attendance_edits")
    .select("*")
    .eq("employee_id", employeeId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as AttendanceEdit[];
}
