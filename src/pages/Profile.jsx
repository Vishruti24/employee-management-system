import { useParams, useNavigate } from "react-router-dom";
//import { useEmployees } from "../context/EmployeeContext";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
import StatusToggle from "../components/StatusToggle";
import { toggleStatus } from "../redux/employeeSlice";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  //const { employees, toggleStatus } = useEmployees();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees) || [];
  const [openEdit, setOpenEdit] = useState(false);

  const employee = employees.find(
    (e) => String(e.id) === String(id)
  );

  if (!employee) return <p>Employee not found</p>;

  return (
    <div className="p-6">
      <button onClick={() => navigate("/employees")}>← Back to Employee</button>

      <div className="bg-white p-6 rounded shadow mt-4">
        <h2 className="text-xl font-semibold">{employee.name}</h2>

        {/* <StatusToggle
          status={employee.status}
          onToggle={() => toggleStatus(employee.id)}
        /> */}
        
         <StatusToggle
          status={employee.status}
          onToggle={() => dispatch(toggleStatus(employee.id))}
        />
         
        <p>Email: {employee.email}</p>
        <p>Department: {employee.department}</p>
        <p>Role: {employee.role}</p>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={() => setOpenEdit(true)}
        >
          Edit
        </button>
      </div>

      {openEdit && (
        <Modal onClose={() => setOpenEdit(false)}>
          <EmployeeForm
            employee={employee}
            onClose={() => setOpenEdit(false)}
          />
        </Modal>
      )}
    </div>
  );
}
