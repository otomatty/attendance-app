import { Employee, PartialEmployee } from "./employee";
import { AttendanceRecord } from "./attendance";

export interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (employee: PartialEmployee) => void;
  onCancel: () => void;
}

export interface EmployeeItemProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export interface AttendanceFormProps {
  onSubmit: (record: Partial<AttendanceRecord>) => void;
}

export interface EditHistoryProps {
  employeeId: string;
}

export interface AlertDialogProps {
  employeeId: string;
}

export interface MaxWorkHoursSettingProps {
  // 必要に応じてプロパティを追加
}
