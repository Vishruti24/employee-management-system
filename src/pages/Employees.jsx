import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeSearch from "../components/EmployeeSearch";
import DepartmentFilter from "../components/DepartmentFilter";
import EmployeeSort from "../components/EmployeeSort";
import EmployeeForm from "../components/EmployeeForm";
import Modal from "../components/Modal";

export default function Employees() {
  const { employees, deleteEmployee } = useEmployees();

  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("");
  const [open, setOpen] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [sortBy, setSortBy] = useState("");


  // const filteredEmployees = employees.filter(emp =>
  //   emp.name.toLowerCase().includes(search.toLowerCase()) &&
  //   (dept ? emp.department === dept : true)
  // );


  const filteredEmployees = employees
  .filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) &&
    (dept ? emp.department === dept : true)
  )
  .sort((a, b) => {
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortBy === "status") {
      return a.status === "Active" ? -1 : 1;
    }
    return 0;
  });
 

  const handleEdit = (emp) => {
    setEditEmp(emp);
    setOpen(true);
  };


  return (
    <div>
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

      {/* Search & Filter */}
      <div className="flex gap-8 mb-4">
        <EmployeeSearch value={search} onChange={setSearch} />
        <DepartmentFilter value={dept} onChange={setDept} />
        <EmployeeSort value={sortBy} onChange={setSortBy} />
      </div>

      {/* Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onDelete={deleteEmployee}
        onEdit={handleEdit}
      />

      {/* Modal */}
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <EmployeeForm
            employee={editEmp}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
