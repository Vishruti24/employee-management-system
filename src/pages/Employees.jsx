import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeSearch from "../components/EmployeeSearch";
import DepartmentFilter from "../components/DepartmentFilter";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";

export default function Employees() {
  const { employees, deleteEmployee } = useEmployees();

  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [open, setOpen] = useState(false);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (dept ? emp.department === dept : true)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Employees</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <EmployeeSearch value={search} onChange={setSearch} />
        <DepartmentFilter value={dept} onChange={setDept} />
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onDelete={deleteEmployee}
      />

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <EmployeeForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
