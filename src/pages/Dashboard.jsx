import { useEmployees } from "../context/EmployeeContext";

export default function Dashboard() {
  const { employees } = useEmployees();
  const active = employees.filter((e) => e.status === "Active").length;

  return (
    <div className="max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-zinc-500 mb-1">Total Employees</p>
          <p className="text-3xl font-semibold text-zinc-800">
            {employees.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-zinc-500 mb-1">Active</p>
          <p className="text-3xl font-semibold text-emerald-600">{active}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-zinc-500 mb-1">Inactive</p>
          <p className="text-3xl font-semibold text-red-500">
            {employees.length - active}
          </p>
        </div>
      </div>
    </div>
  );
}
