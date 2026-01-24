import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDataGrid from "../components/EmployeeDataGrid";
import Alert from "../components/Alert";

export default function Employees() {
  const {
    employees = [],
    deleteEmployee,
    toggleStatus,
    loading,
    error,
    isOnline,
  } = useEmployees();

  const [open, setOpen] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [alert, setAlert] = useState(null);

  if (!isOnline) {
    return <div className="error">No Internet Connection</div>;
  }

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {alert && <Alert {...alert} />}

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Employees</h2>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditEmp(null);
            setOpen(true);
          }}
        >
          Add Employee
        </button>
      </div>
      {/* MOBILE VIEW (Cards) */}
      <div className="md:hidden space-y-4">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">No employees found</p>
        ) : (
          employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              emp={emp}
              onEdit={(emp) => {
                setEditEmp(emp);
                setOpen(true);
              }}
              onDelete={(id) => {
                if (window.confirm("Delete this employee?")) {
                  deleteEmployee(id);
                  setAlert({
                    type: "success",
                    message: "Employee deleted",
                  });
                }
              }}
            />
          ))
        )}
      </div>

      {/* DESKTOP VIEW (DataGrid) */}
      <div className="hidden md:block">
        <EmployeeDataGrid
          employees={employees}
          toggleStatus={toggleStatus}
          onEdit={(emp) => {
            setEditEmp(emp);
            setOpen(true);
          }}
          onDelete={(id) => {
            if (window.confirm("Delete this employee?")) {
              deleteEmployee(id);
              setAlert({
                type: "success",
                message: "Employee deleted",
              });
            }
          }}
        />
      </div>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <EmployeeForm employee={editEmp} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
