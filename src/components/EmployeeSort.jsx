import { ArrowUpDown } from "lucide-react";
export default function EmployeeSort({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded"
    >
      <option value="">Sort By</option>
      <option value="name-asc">Name (A–Z)</option>
      <option value="name-desc">Name (Z–A)</option>
      <option value="status">Status (Active first)</option>
    </select>
  );
}
