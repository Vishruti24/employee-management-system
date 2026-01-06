import { useParams } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import Modal from "../components/Modal";
import EmployeeForm from "../components/EmployeeForm";
//import Loader from "../components/Loader";
import { useState } from "react";
import StatusToggle from "../components/StatusToggle.jsx";

export default function Profile() {
  const { id } = useParams();
  const { employees } = useEmployees();
  const [openEdit, setOpenEdit] = useState(false);

  const employee = employees.find(emp => emp.id === Number(id));

 
  // if (!employees.length) return <Loader />;

 
  if (!employee) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Employee not found
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl bg-white rounded-lg shadow p-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold">
              {employee.name.charAt(0)}
            </div>

            {/* Name + Status */}
            <div>
              <h2 className="text-xl font-semibold">{employee.name}</h2>
              <StatusToggle status={employee.status}/>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setOpenEdit(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-3 text-gray-700">
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Department:</b> {employee.department}</p>
          <p><b>Role:</b> {employee.role}</p>
        </div>
      </div>

      {/* Edit Modal */}
      {openEdit && (
        <Modal onClose={() => setOpenEdit(false)}>
          <EmployeeForm
            employee={employee}
            closeModal={() => setOpenEdit(false)}
          />
        </Modal>
      )}
    </div>
  );
}

