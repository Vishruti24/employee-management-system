import { DataGrid } from "@mui/x-data-grid";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusToggle from "./StatusToggle";
import { GridToolbar } from "@mui/x-data-grid/internals";

export default function EmployeeDataGrid({
  employees,
  onEdit,
  onDelete,
  toggleStatus,
}) {
  // Map employees to rows for DataGrid
  const rows = employees.map((emp) => ({
    id: emp.id,
    name: emp.name,
    email: emp.email,
    department: emp.department,
    status: emp.status,
  }));

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      sortable: true,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      sortComparator: (s1, s2) => {
        // Active first
        if (s1 === "Active" && s2 !== "Active") return -1;
        if (s1 !== "Active" && s2 === "Active") return 1;
        return 0;
      },
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
      renderCell: (params) => (
        <div className="flex gap-2 justify-center">
          <Link to={`/profile/${params.id}`}>
            <Eye size={20} className="text-purple-900" />
          </Link>
          <button
            onClick={() => onEdit(employees.find((e) => e.id === params.id))}
          >
            <Pencil size={18} className="text-blue-600" />
          </button>
          <button onClick={() => onDelete(params.id)}>
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
