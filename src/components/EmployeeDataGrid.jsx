import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";

export default function EmployeeDataGrid({
  employees = [],
  onEdit,
  onDelete,
  toggleStatus,
}) {
  const rows = employees.map((emp) => ({
    id: String(emp.id),
    name: emp.name,
    email: emp.email,
    department: emp.department,
    status: emp.status || "Inactive",
  }));

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable:true,
      renderCell: (params) => (
        <StatusToggle
          status={params.value}
          onToggle={() => toggleStatus(params.id)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const emp = employees.find((e) => String(e.id) === String(params.id));

        return (
          <div className="flex gap-2">
            <Link to={`/profile/${params.id}`}>
              <Eye size={18} />
            </Link>
            <button onClick={() => onEdit(emp)}>
              <Pencil size={18} className="text-blue-600" />
            </button>
            <button onClick={() => onDelete(params.id)}>
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      pageSize={10}
      disableRowSelectionOnClick
      slots={{ toolbar: GridToolbar }}
    />
  );
}
