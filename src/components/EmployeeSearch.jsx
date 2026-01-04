export default function EmployeeSearch({ value, onChange }) {
  return (
    <input
      placeholder="Search employee..."
      className="border p-2 rounded w-64"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
