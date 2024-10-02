import { supabase } from "./client";
import {
  Employee,
  NewEmployee,
  PartialEmployee,
  EmployeeListItem,
  EmployeeWithAttendance,
} from "../../types/employee";

export async function getEmployees(): Promise<EmployeeListItem[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("id, first_name, last_name, email, is_admin");

  if (error) throw error;
  return data.map((employee) => ({
    id: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
    email: employee.email,
    is_admin: employee.is_admin,
  }));
}

export async function createEmployee(employee: NewEmployee): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .insert({ ...employee, is_active: true, is_admin: false })
    .single();

  if (error) throw error;
  return data as Employee;
}

export async function updateEmployee(
  id: string,
  employee: PartialEmployee
): Promise<Employee> {
  const { data, error } = await supabase
    .from("employees")
    .update(employee)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Employee;
}

export async function deleteEmployee(id: string): Promise<void> {
  const { error } = await supabase.from("employees").delete().eq("id", id);

  if (error) throw error;
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw error;
  }
  return data as Employee;
}

export async function getEmployeeByQRCode(
  qrCode: string
): Promise<Employee | null> {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("qr_code", qrCode)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // レコードが見つからない場合
      return null;
    }
    throw error;
  }
  return data as Employee;
}

export async function updateEmployeeAdminStatus(
  employeeId: string,
  isAdmin: boolean
): Promise<void> {
  const { error } = await supabase
    .from("employees")
    .update({ is_admin: isAdmin })
    .eq("id", employeeId);

  if (error) throw error;
}

export async function getAllEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from("employees").select("*");

  if (error) throw error;
  return data as Employee[];
}

export const getEmployeesWithAttendance = async (): Promise<
  EmployeeWithAttendance[]
> => {
  const { data, error } = await supabase
    .from("employees")
    .select(
      `
      id,
      first_name,
      last_name,
      email,
      is_admin,
      attendance_records (
        check_in,
        check_out,
        created_at
      )
    `
    )
    .order("created_at", {
      foreignTable: "attendance_records",
      ascending: false,
    })
    .limit(1, { foreignTable: "attendance_records" });

  if (error) throw error;

  return data.map((employee: any) => {
    const latestAttendance = employee.attendance_records[0];
    const checkIn = latestAttendance?.check_in
      ? new Date(latestAttendance.check_in)
      : null;
    const checkOut = latestAttendance?.check_out
      ? new Date(latestAttendance.check_out)
      : null;

    const isWorking = !!checkIn && (!checkOut || checkOut < checkIn);

    return {
      id: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
      email: employee.email,
      is_admin: employee.is_admin,
      is_working: isWorking,
      check_in_time: checkIn ? checkIn.toISOString() : null,
      check_out_time: checkOut ? checkOut.toISOString() : null,
    };
  });
};

export async function getEmployeesList(): Promise<EmployeeListItem[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("id, first_name, last_name")
    .order("last_name", { ascending: true });

  if (error) throw error;
  return data.map((employee) => ({
    id: employee.id,
    name: `${employee.last_name} ${employee.first_name}`,
  }));
}
