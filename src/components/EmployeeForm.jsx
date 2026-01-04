import { useState } from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeForm({ onClose }) {
  const { addEmployee } = useEmployees();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Active",
  });

  const submit = e => {
    e.preventDefault();
    addEmployee(form);
    onClose();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="text-xl font-semibold">Add Employee</h3>

      <input
        required
        placeholder="Name"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        placeholder="Email"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Department"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, department: e.target.value })}
      />

      <input
        placeholder="Role"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, role: e.target.value })}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save
      </button>
    </form>
  );
}
