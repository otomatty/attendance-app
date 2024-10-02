import { supabase } from "./client";
import { AttendanceRecord, AttendanceEdit } from "../../types/attendance";

export async function getAttendanceRecords(
  employeeId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceRecord[]> {
  const { data, error } = await supabase
    .from("attendance_records")
    .select("*")
    .eq("employee_id", employeeId)
    .gte("check_in", startDate)
    .lte("check_in", endDate);

  if (error) throw error;
  return data as AttendanceRecord[];
}

export async function createAttendanceRecord(
  record: Partial<AttendanceRecord>
): Promise<AttendanceRecord> {
  const { data, error } = await supabase
    .from("attendance_records")
    .insert(record)
    .single();

  if (error) throw error;
  return data as AttendanceRecord;
}

export async function updateAttendanceRecord(
  id: string,
  record: Partial<AttendanceRecord>
): Promise<AttendanceRecord> {
  const { data, error } = await supabase
    .from("attendance_records")
    .update(record)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as AttendanceRecord;
}

export async function createAttendanceEdit(
  edit: Partial<AttendanceEdit>
): Promise<AttendanceEdit> {
  const { data, error } = await supabase
    .from("attendance_edits")
    .insert(edit)
    .single();

  if (error) throw error;
  return data as AttendanceEdit;
}

export async function getLatestAttendanceRecord(
  employeeId: string
): Promise<AttendanceRecord | null> {
  const { data, error } = await supabase
    .from("attendance_records")
    .select("*")
    .eq("employee_id", employeeId)
    .order("check_in", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw error;
  }
  return data as AttendanceRecord;
}

export async function getAttendanceRecord(
  employeeId: string,
  date: string
): Promise<AttendanceRecord | null> {
  const startOfDay = `${date}T00:00:00`;
  const endOfDay = `${date}T23:59:59`;

  const { data, error } = await supabase
    .from("attendance_records")
    .select("*")
    .eq("employee_id", employeeId)
    .gte("check_in", startOfDay)
    .lte("check_in", endOfDay)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw error;
  }
  return data as AttendanceRecord;
}
