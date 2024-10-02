import { Component } from "solid-js";
import { errorMessage } from "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: Component<ErrorMessageProps> = (props) => {
  return <>{props.message && <p class={errorMessage}>{props.message}</p>}</>;
};

export default ErrorMessage;
