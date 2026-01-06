import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeForm({ employee, onClose }) {
  const { addEmployee, updateEmployee } = useEmployees();

  const [form, setForm] = useState(
    employee || {
      name: "",
      email: "",
      department: "",
      role: "",
      status: "Active",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      updateEmployee(form); // UPDATE emp
    } else {
      addEmployee(form); // ADD emp
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        required
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        type="email"
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Department"
        value={form.department}
        onChange={e => setForm({ ...form, department: e.target.value })}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Role"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      />

      <select
        className="w-full border p-2 rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

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
