import { Component, For } from "solid-js";
import { Employee } from "../../../../types/employee";
import EmployeeItem from "../EmployeeItem/EmployeeItem";
import { table, th } from "./EmployeeList.css";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onGenerateQRCode: (employee: Employee) => void;
}

const EmployeeList: Component<EmployeeListProps> = (props) => {
  return (
    <table class={table}>
      <thead>
        <tr>
          <th class={th}>名前</th>
          <th class={th}>メールアドレス</th>
          <th class={th}>役職</th>
          <th class={th}>操作</th>
        </tr>
      </thead>
      <tbody>
        <For each={props.employees}>
          {(employee) => (
            <EmployeeItem
              employee={employee}
              onEdit={props.onEdit}
              onDelete={props.onDelete}
              onGenerateQRCode={props.onGenerateQRCode}
            />
          )}
        </For>
      </tbody>
    </table>
  );
};

export default EmployeeList;
