import { Component } from "solid-js";
import { Employee } from "../../../../types/employee";
import {
  tr,
  button,
  editButton,
  deleteButton,
  qrButton,
} from "./EmployeeItem.css";
import { td } from "../EmployeeList/EmployeeList.css";

interface EmployeeItemProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onGenerateQRCode: (employee: Employee) => void;
}

const EmployeeItem: Component<EmployeeItemProps> = (props) => {
  if (!props.employee) {
    return null;
  }

  const handleGenerateQRCode = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    props.onGenerateQRCode(props.employee);
  };

  return (
    <tr class={tr}>
      <td class={td}>
        {props.employee.first_name} {props.employee.last_name}
      </td>
      <td class={td}>{props.employee.email}</td>
      <td class={td}>{props.employee.position}</td>
      <td class={td}>
        <button
          class={`${button} ${editButton}`}
          onClick={() => props.onEdit(props.employee)}
        >
          編集
        </button>
        <button
          class={`${button} ${deleteButton}`}
          onClick={() => props.onDelete(props.employee.id)}
        >
          削除
        </button>
        <button class={`${button} ${qrButton}`} onClick={handleGenerateQRCode}>
          QRコード生成
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;
