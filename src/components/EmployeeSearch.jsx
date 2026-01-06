import {Search} from "lucide-react";
export default function EmployeeSearch({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
<div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search employee by name..."
          className="pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </div>
    </div>
  );
}
