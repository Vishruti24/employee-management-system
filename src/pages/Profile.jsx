import { useParams, useNavigate } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { useState } from "react";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import StatusToggle from "../components/StatusToggle";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployees();
  const [openEdit, setOpenEdit] = useState(false);

  const employee = employees.find((emp) => emp.id === Number(id));

  if (!employee) {
    return <p className="text-center mt-20">Employee not found</p>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/employees")}
        className="text-blue-600 mb-4"
      >
        ← Back to Employees
      </button>

      <div className="max-w-3xl bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <StatusToggle status={employee.status} />
          </div>
          <button
            onClick={() => setOpenEdit(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <p>Email: {employee.email}</p>
          <p>Department: {employee.department}</p>
          <p>Role: {employee.role}</p>
        </div>
      </div>

      {openEdit && (
        <Modal onClose={() => setOpenEdit(false)}>
          <EmployeeForm
            employee={employee}
            onClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}
    </div>
  );
}
