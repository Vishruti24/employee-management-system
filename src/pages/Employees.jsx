import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDataGrid from "../components/EmployeeDataGrid";
import Alert from "../components/Alert";

export default function Employees() {
  const { employees, deleteEmployee, toggleStatus } = useEmployees();

  const [open, setOpen] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleEdit = (emp) => {
    setEditEmp(emp);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteEmployee(id);
      setAlert({ type: "success", message: "Employee deleted successfully" });
    }
  };

  return (
    <div>
      {alert && <Alert {...alert} />}
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Employees</h2>

        <button
          onClick={() => {
            setEditEmp(null);
            setOpen(true);
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Add Employee
        </button>
      </div>

      {/* Responsive */}
      {/* Desktop */}
      <div className="hidden md:block">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No employees found</p>
        ) : (
          <EmployeeDataGrid
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            toggleStatus={toggleStatus}
          />
        )}
      </div>

      {/* Mobile */}
      <div className="grid gap-4 md:hidden">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No employees found</p>
        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              emp={emp}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <EmployeeForm employee={editEmp} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
