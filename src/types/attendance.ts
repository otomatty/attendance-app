export interface AttendanceRecord {
  id: string;
  employee_id: string;
  check_in: string;
  check_out: string | null;
  // 他の必要なプロパティ
}

export interface AttendanceEdit {
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

export interface AttendanceUpdateData extends Partial<AttendanceRecord> {
  reason?: string;
}
