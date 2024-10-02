import { Component } from "solid-js";
import { CompanyData } from "../../../../types/company";
import {
  container,
  title,
  confirmationItem,
  label,
  value,
  buttonGroup,
  editButton,
  confirmButton,
} from "./RegistrationConfirmation.css";

interface RegistrationConfirmationProps {
  data: CompanyData;
  onConfirm: () => void;
  onEdit: () => void;
}

const RegistrationConfirmation: Component<RegistrationConfirmationProps> = (
  props
) => {
  return (
    <div class={container}>
      <h2 class={title}>登録情報の確認</h2>
      <div class={confirmationItem}>
        <span class={label}>会社名:</span>
        <span class={value}>{props.data.name}</span>
      </div>
      <div class={confirmationItem}>
        <span class={label}>住所:</span>
        <span class={value}>{props.data.address}</span>
      </div>
      <div class={confirmationItem}>
        <span class={label}>電話番号:</span>
        <span class={value}>{props.data.phone}</span>
      </div>
      <div class={confirmationItem}>
        <span class={label}>管理者名:</span>
        <span
          class={value}
        >{`${props.data.adminLastName} ${props.data.adminFirstName}`}</span>
      </div>
      <div class={confirmationItem}>
        <span class={label}>管理者メールアドレス:</span>
        <span class={value}>{props.data.adminEmail}</span>
      </div>
      <div class={buttonGroup}>
        <button class={editButton} onClick={props.onEdit}>
          編集
        </button>
        <button class={confirmButton} onClick={props.onConfirm}>
          確認
        </button>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
