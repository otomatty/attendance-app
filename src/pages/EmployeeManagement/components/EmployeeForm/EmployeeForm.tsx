import { Component, createSignal } from "solid-js";
import { EmployeeFormProps } from "../../../../types/components";
import { PartialEmployee } from "../../../../types/employee";
import {
  form,
  formGroup,
  label,
  input,
  textarea,
  checkbox,
  buttonGroup,
  submitButton,
  cancelButton,
} from "./EmployeeForm.css";

const EmployeeForm: Component<EmployeeFormProps> = (props) => {
  const [firstName, setFirstName] = createSignal(
    props.employee?.first_name || ""
  );
  const [lastName, setLastName] = createSignal(props.employee?.last_name || "");
  const [email, setEmail] = createSignal(props.employee?.email || "");
  const [position, setPosition] = createSignal(props.employee?.position || "");
  const [department, setDepartment] = createSignal(
    props.employee?.department || ""
  );
  const [hireDate, setHireDate] = createSignal(props.employee?.hire_date || "");
  const [salary, setSalary] = createSignal(
    props.employee?.salary?.toString() || ""
  );
  const [phoneNumber, setPhoneNumber] = createSignal(
    props.employee?.phone_number || ""
  );
  const [address, setAddress] = createSignal(props.employee?.address || "");
  const [isAdmin, setIsAdmin] = createSignal(props.employee?.is_admin || false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const employeeData: PartialEmployee = {
      first_name: firstName(),
      last_name: lastName(),
      email: email(),
      position: position(),
      department: department() || null,
      hire_date: hireDate(),
      salary: salary() ? parseFloat(salary()) : null,
      phone_number: phoneNumber() || null,
      address: address() || null,
      is_active: props.employee ? props.employee.is_active : true,
      is_admin: isAdmin(),
    };
    props.onSubmit(employeeData);
  };

  return (
    <form class={form} onSubmit={handleSubmit}>
      <div class={formGroup}>
        <label class={label} for="firstName">
          名:
        </label>
        <input
          class={input}
          id="firstName"
          type="text"
          value={firstName()}
          onInput={(e) => setFirstName(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="lastName">
          姓:
        </label>
        <input
          class={input}
          id="lastName"
          type="text"
          value={lastName()}
          onInput={(e) => setLastName(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="email">
          メールアドレス:
        </label>
        <input
          class={input}
          id="email"
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="position">
          役職:
        </label>
        <input
          class={input}
          id="position"
          type="text"
          value={position()}
          onInput={(e) => setPosition(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="department">
          部署:
        </label>
        <input
          class={input}
          id="department"
          type="text"
          value={department()}
          onInput={(e) => setDepartment(e.currentTarget.value)}
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="hireDate">
          雇用日:
        </label>
        <input
          class={input}
          id="hireDate"
          type="date"
          value={hireDate()}
          onInput={(e) => setHireDate(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="salary">
          給与:
        </label>
        <input
          class={input}
          id="salary"
          type="number"
          value={salary()}
          onInput={(e) => setSalary(e.currentTarget.value)}
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="phoneNumber">
          電話番号:
        </label>
        <input
          class={input}
          id="phoneNumber"
          type="tel"
          value={phoneNumber()}
          onInput={(e) => setPhoneNumber(e.currentTarget.value)}
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="address">
          住所:
        </label>
        <textarea
          class={textarea}
          id="address"
          value={address()}
          onInput={(e) => setAddress(e.currentTarget.value)}
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="isAdmin">
          <input
            class={checkbox}
            id="isAdmin"
            type="checkbox"
            checked={isAdmin()}
            onChange={(e) => setIsAdmin(e.currentTarget.checked)}
          />
          管理者権限
        </label>
      </div>
      <div class={buttonGroup}>
        <button class={submitButton} type="submit">
          {props.employee ? "更新" : "追加"}
        </button>
        <button class={cancelButton} type="button" onClick={props.onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
