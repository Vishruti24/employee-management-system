import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/employeeApi";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  //  Fetch employee
  const fetchEmployees = async () => {
    if (!navigator.onLine) {
      setError("No Internet Connection");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await api.get("/");
      setEmployees(res.data);
    } catch (err) {
      setError("Unable to fetch employees. Server issue.");
    } finally {
      setLoading(false);
    }
  };

  //  ADD Employee
  const addEmployee = async (emp) => {
    try {
      if (!navigator.onLine) {
        setError("No Internet Connection");
        return;
      }
      const res = await api.post("/", emp);
      setEmployees((prev) => [...prev, res.data]); // optimistic
    } catch {
      setError("Failed to add Employee");
    }
  };

  //  UPDATE Employee
  const updateEmployee = async (id, emp) => {
    try {
      if (!navigator.onLine) {
        setError("No Internet Connection");
        return;
      }
      await api.put(`/${id}`, emp);
      setEmployees((prev) => prev.map((e) => (e.id === id ? emp : e)));
    } catch {
      setError("Update Failed");
    }
  };

  //  DELETE Employee
  const deleteEmployee = async (id) => {
    try {
      if (!navigator.onLine) {
        setError("No Internet Connection");
        return;
      }
      await api.delete(`/${id}`);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Delete Failed");
    }
  };

  //For internet errors
  useEffect(() => {
    const onlineHandler = () => {
      setIsOnline(true);
      fetchEmployees(); // refetch automatically
    };

    const offlineHandler = () => {
      setIsOnline(false);
      setError("No Internet Connection");
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    fetchEmployees();

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        isOnline,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
