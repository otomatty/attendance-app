import { Component, createSignal } from "solid-js";
import { CompanyData } from "../../../../types/company";
import {
  form,
  formGroup,
  label,
  input,
  submitButton,
} from "./RegistrationForm.css";

interface RegistrationFormProps {
  onSubmit: (data: CompanyData) => void;
}

const RegistrationForm: Component<RegistrationFormProps> = (props) => {
  const [name, setName] = createSignal("");
  const [address, setAddress] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [adminFirstName, setAdminFirstName] = createSignal("");
  const [adminLastName, setAdminLastName] = createSignal("");
  const [adminEmail, setAdminEmail] = createSignal("");
  const [adminPassword, setAdminPassword] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const data: CompanyData = {
      name: name(),
      address: address(),
      phone: phone(),
      adminFirstName: adminFirstName(),
      adminLastName: adminLastName(),
      adminEmail: adminEmail(),
      adminPassword: adminPassword(),
    };
    props.onSubmit(data);
  };

  return (
    <form class={form} onSubmit={handleSubmit}>
      <div class={formGroup}>
        <label class={label} for="name">
          会社名
        </label>
        <input
          class={input}
          id="name"
          type="text"
          value={name()}
          onInput={(e) => setName(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="address">
          住所
        </label>
        <input
          class={input}
          id="address"
          type="text"
          value={address()}
          onInput={(e) => setAddress(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="phone">
          電話番号
        </label>
        <input
          class={input}
          id="phone"
          type="tel"
          value={phone()}
          onInput={(e) => setPhone(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="adminFirstName">
          管理者名（姓）
        </label>
        <input
          class={input}
          id="adminFirstName"
          type="text"
          value={adminFirstName()}
          onInput={(e) => setAdminFirstName(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="adminLastName">
          管理者名（名）
        </label>
        <input
          class={input}
          id="adminLastName"
          type="text"
          value={adminLastName()}
          onInput={(e) => setAdminLastName(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="adminEmail">
          管理者メールアドレス
        </label>
        <input
          class={input}
          id="adminEmail"
          type="email"
          value={adminEmail()}
          onInput={(e) => setAdminEmail(e.currentTarget.value)}
          required
        />
      </div>
      <div class={formGroup}>
        <label class={label} for="adminPassword">
          管理者パスワード
        </label>
        <input
          class={input}
          id="adminPassword"
          type="password"
          value={adminPassword()}
          onInput={(e) => setAdminPassword(e.currentTarget.value)}
          required
        />
      </div>
      <button class={submitButton} type="submit">
        登録
      </button>
    </form>
  );
};

export default RegistrationForm;
