import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { validateEmployee } from "../utils/validators";
import Alert from "./Alert";

export default function EmployeeForm({ employee, onClose }) {
  const { addEmployee, updateEmployee, employees } = useEmployees();

  const [form, setForm] = useState(
    employee || {
      name: "",
      email: "",
      department: "",
      role: "",
      joiningDate: "",
      endDate: "",
      status: "Active",
    }
  );
  const [alert, setAlert] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validateEmployee(form, employees, employee?.id);
    if (error) {
      setAlert({ type: "error", message: error });
      return;
    }

    const status = form.endDate ? "Inactive" : "Active";

    if (employee) {
      updateEmployee(employee.id, { ...form, status });
      setAlert({ type: "success", message: "Employee updated" });
    } else {
      addEmployee({ ...form, status });
      setAlert({ type: "success", message: "Employee added" });
    }

    setTimeout(onClose, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {alert && <Alert {...alert} />}

      <input
        required
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        type="email"
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />

      <input
        type="date"
        value={form.joiningDate}
        onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
        required
      />

      <input
        type="date"
        value={form.endDate}
        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
      />

      {!form.endDate && (
        <p className="text-sm text-green-600">Currently Working</p>
      )}

      {/* <select
        className="w-full border p-2 rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select> */}

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </form>
  );
}
