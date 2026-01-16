export default function DepartmentFilter({ value, onChange }) {
  return (
    <select
      className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All Departments</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
      <option value="AI">AI</option>
      <option value="Data-Science">Data-Science</option>
      <option value="System Design">System Design</option>
      <option value="BDE">BDE</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
      <option value="Content Creator">Content Creator</option>
    </select>
  );
}
