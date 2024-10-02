import { Component, createSignal, Show } from "solid-js";
import { CompanyData } from "../../types/company";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import RegistrationConfirmation from "./components/RegistrationConfirmation/RegistrationConfirmation";
import RegistrationComplete from "./components/RegistrationComplete/RegistrationComplete";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import InitialSetup from "./components/InitialSetup/InitialSetup";
import {
  container,
  stepIndicator,
  activeStep,
  step,
  title,
} from "./CompanyRegistration.css";

type RegistrationStep =
  | "form"
  | "confirmation"
  | "complete"
  | "emailVerification"
  | "initialSetup";

const CompanyRegistration: Component = () => {
  const [currentStep, setCurrentStep] = createSignal<RegistrationStep>("form");
  const [companyData, setCompanyData] = createSignal<CompanyData | null>(null);

  const handleFormSubmit = (data: CompanyData) => {
    setCompanyData(data);
    setCurrentStep("confirmation");
  };

  const handleConfirmation = () => {
    // ここで実際の登録処理を行う
    // 成功したら、setCurrentStep("emailVerification") を呼び出す
    setCurrentStep("emailVerification");
  };

  const handleEdit = () => {
    setCurrentStep("form");
  };

  const handleEmailVerified = () => {
    setCurrentStep("initialSetup");
  };

  const handleSetupComplete = () => {
    setCurrentStep("complete");
  };

  return (
    <div class={container}>
      <h1 class={title}>企業登録</h1>
      <div class={stepIndicator}>
        <div class={currentStep() === "form" ? activeStep : step}>
          フォーム入力
        </div>
        <div class={currentStep() === "confirmation" ? activeStep : step}>
          確認
        </div>
        <div class={currentStep() === "emailVerification" ? activeStep : step}>
          メール認証
        </div>
        <div class={currentStep() === "initialSetup" ? activeStep : step}>
          初期設定
        </div>
        <div class={currentStep() === "complete" ? activeStep : step}>完了</div>
      </div>

      <Show when={currentStep() === "form"}>
        <RegistrationForm onSubmit={handleFormSubmit} />
      </Show>

      <Show when={currentStep() === "confirmation" && companyData()}>
        <RegistrationConfirmation
          data={companyData()!}
          onConfirm={handleConfirmation}
          onEdit={handleEdit}
        />
      </Show>

      <Show when={currentStep() === "emailVerification"}>
        <EmailVerification onVerified={handleEmailVerified} />
      </Show>

      <Show when={currentStep() === "initialSetup"}>
        <InitialSetup onComplete={handleSetupComplete} />
      </Show>

      <Show when={currentStep() === "complete"}>
        <RegistrationComplete />
      </Show>
    </div>
  );
};

export default CompanyRegistration;
