import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";
import { useEmployees } from "../context/EmployeeContext";


export default function EmployeeTable({ employees, onDelete }) {

const { toggleStatus } = useEmployees();


  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="text-left border-b">
          <th className="p-3">Name</th>
          <th>Email</th>
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

            <td className="flex gap-3">
              <Link to={`/profile/${emp.id}`}>
                <Eye size={18} className="text-blue-600" />
              </Link>
<button
  onClick={() => setEditEmp(emp)}>
  <Pencil size={16} className="text-blue-600" />
</button>
              <button
                onClick={() => onDelete(emp.id)}>
                <Trash2 size={18} className="text-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>


  );
}
