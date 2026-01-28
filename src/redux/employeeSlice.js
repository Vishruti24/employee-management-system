import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/employeeApi";

// Async Thunks for API calls
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/");
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to fetch employees");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      const res = await api.post("/", employee);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to add employee");
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      await api.put(`/${id}`, employee);
      return { id, employee };
    } catch (err) {
      return rejectWithValue("Failed to update employee");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue("Failed to delete employee");
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    isOnline: navigator.onLine,
  },
  reducers: {
    setOnlineStatus(state, action) {
      state.isOnline = action.payload;
    },
    toggleStatus(state, action) {
      const emp = state.employees.find((e) => e.id === action.payload);
      if (emp) {
        emp.status = emp.status === "Active" ? "Inactive" : "Active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADD
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((e) =>
          e.id === action.payload.id ? action.payload.employee : e
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setOnlineStatus, toggleStatus } = employeeSlice.actions;
export default employeeSlice.reducer;
