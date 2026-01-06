import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";
import { useEmployees } from "../context/EmployeeContext";


export default function EmployeeTable({ employees, onDelete, onEdit }) {
  const { toggleStatus } = useEmployees();

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="text-center text-white bg-zinc-600 border-b">
          <th className="p-4">Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map(emp => (
          <tr key={emp.id} className="border-t text-center">
            <td className="p-3">{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>

            <td>
              <StatusToggle
                status={emp.status}
                onToggle={() => toggleStatus(emp.id)}
              />
            </td>

            <td className="flex gap-3 justify-center">
              <Link to={`/profile/${emp.id}`}>
                <Eye size={20} className="text-purple-900" />
              </Link>

              <button onClick={() => onEdit(emp)}>
                <Pencil size={18} className="text-blue-600" />
              </button>

              <button onClick={() => onDelete(emp.id)}>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

