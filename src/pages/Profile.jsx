import { useParams } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

export default function Profile() {
  const { id } = useParams();
  const { employees } = useEmployees();

  const emp = employees.find(e => e.id === Number(id));

  if (!emp) return <p>Employee not found</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{emp.name}</h2>
      <p>Email: {emp.email}</p>
      <p>Department: {emp.department}</p>
      <p>Role: {emp.role}</p>
      <p>Status: {emp.status}</p>
    </div>
  );
}
