export interface Employee {
  id: string; // UUIDはstring型で扱います
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department: string | null;
  hire_date: string; // 日付はstring型で扱い、必要に応じてDate型に変換します
  salary: number | null;
  phone_number: string | null;
  address: string | null;
  is_active: boolean;
  is_admin: boolean;
  created_at: string; // タイムスタンプもstring型で扱います
  updated_at: string;
  name: string;
}

// フォームで使用する際の部分的な従業員データ型
export interface PartialEmployee {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  department?: string | null;
  hire_date: string;
  salary?: number | null;
  phone_number?: string | null;
  address?: string | null;
  is_active: boolean;
  is_admin: boolean;
}

// 新規従業員作成時に使用する型
export type NewEmployee = Omit<PartialEmployee, "is_active" | "is_admin"> & {
  is_active?: boolean;
  is_admin?: boolean;
};

// 従業員リスト表示用の簡略化された従業員データ型
export interface EmployeeListItem {
  id: string;
  name: string;
}

export interface EmployeeWithAttendance extends EmployeeListItem {
  is_working: boolean;
  check_in_time: string | null;
  check_out_time: string | null;
}
