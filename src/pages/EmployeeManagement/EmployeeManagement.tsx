import { Component, createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Employee, PartialEmployee } from "../../types/employee";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../lib/supabase/employees";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import QRCodeGenerator from "../../components/QRCodeGenerator/QRCodeGenerator";
import Modal from "../../components/Modal/Modal";
import {
  container,
  title,
  addButton,
  loadingText,
  errorMessage,
} from "./EmployeeManagement.css";

const EmployeeManagement: Component = () => {
  const [employees, setEmployees] = createStore<Employee[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [editingEmployee, setEditingEmployee] = createSignal<
    Employee | undefined
  >(undefined);
  const [error, setError] = createSignal<string | null>(null);
  const [selectedEmployeeForQR, setSelectedEmployeeForQR] = createSignal<
    Employee | undefined
  >(undefined);
  const [isQRModalOpen, setIsQRModalOpen] = createSignal(false);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await getAllEmployees();
      setEmployees(fetchedEmployees);
    } catch (err) {
      console.error("従業員データの取得に失敗しました:", err);
      setError("従業員データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    fetchEmployees();
  });

  const handleAdd = () => {
    console.log("handleAdd called");
    setEditingEmployee(undefined);
    setIsModalOpen(true);
    console.log("isModalOpen after handleAdd:", isModalOpen());
  };

  const handleEdit = (employee: Employee) => {
    console.log("handleEdit called", employee);
    setEditingEmployee(employee);
    setIsModalOpen(true);
    console.log("isModalOpen after handleEdit:", isModalOpen());
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("従業員の削除に失敗しました:", err);
      setError("従業員の削除に失敗しました。");
    }
  };

  const handleSubmit = async (employee: PartialEmployee) => {
    try {
      if (editingEmployee()) {
        const updatedEmployee = await updateEmployee(
          editingEmployee()!.id,
          employee
        );
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
      } else {
        const newEmployee = await createEmployee(employee);
        setEmployees((prev) => [...prev, newEmployee]);
      }
      setIsModalOpen(false);
      setEditingEmployee(undefined);
    } catch (err) {
      console.error("従業員の保存に失敗しました:", err);
      setError("従業員の保存に失敗しました。");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingEmployee(undefined);
  };

  const handleGenerateQRCode = (employee: Employee) => {
    setSelectedEmployeeForQR(employee);
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
    setSelectedEmployeeForQR(undefined);
  };

  return (
    <div class={container}>
      <h1 class={title}>従業員管理</h1>
      {loading() ? (
        <p class={loadingText}>読み込み中...</p>
      ) : (
        <>
          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onGenerateQRCode={handleGenerateQRCode}
          />
          <button class={addButton} onClick={handleAdd}>
            新規従業員追加
          </button>
          <Modal isOpen={isModalOpen()} onClose={handleCancel}>
            <EmployeeForm
              employee={editingEmployee()}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </Modal>
          {isQRModalOpen() && selectedEmployeeForQR() && (
            <QRCodeGenerator
              employeeId={selectedEmployeeForQR()!.id}
              employeeName={`${selectedEmployeeForQR()!.first_name} ${
                selectedEmployeeForQR()!.last_name
              }`}
              isOpen={isQRModalOpen()}
              onClose={handleCloseQRModal}
            />
          )}
          {error() && <p class={errorMessage}>{error()}</p>}
        </>
      )}
    </div>
  );
};

export default EmployeeManagement;
