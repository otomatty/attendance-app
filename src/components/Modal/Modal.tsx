import { Component, JSX, Show } from "solid-js";
import { modalOverlay, modalContent, closeButton } from "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  return (
    <Show when={props.isOpen}>
      <div class={modalOverlay} onClick={props.onClose}>
        <div class={modalContent} onClick={(e) => e.stopPropagation()}>
          <button class={closeButton} onClick={props.onClose}>
            ×
          </button>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
