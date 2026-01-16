import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";

export default function EmployeeCard({ emp, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{emp.name}</h3>
        <StatusToggle status={emp.status} />
      </div>

      <p className="text-sm text-gray-600">{emp.email}</p>
      <p className="text-sm">{emp.department}</p>

      <div className="flex gap-4 pt-2">
        <Link to={`/profile/${emp.id}`}>
          <Eye size={18} />
        </Link>
        <button onClick={() => onEdit(emp)}>
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(emp.id)}>
          <Trash2 size={18} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
