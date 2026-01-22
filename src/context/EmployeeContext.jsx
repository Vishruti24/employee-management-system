import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "https://696e0052d7bacd2dd71557cd.mockapi.io/employees";
const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  //  Fetch employee
  const fetchEmployees = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setEmployees(data);
    localStorage.setItem("employees", JSON.stringify(data));
  };

  //  ADD Employee
  const addEmployee = async (emp) => {
    setEmployees((prev) => [...prev, emp]); // optimistic

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emp),
    });

    const saved = await res.json();
    setEmployees((prev) => prev.map((e) => (e === emp ? saved : e)));
    localStorage.setItem("employees", JSON.stringify(employees));
  };

  //  UPDATE Employee
  const updateEmployee = async (id, emp) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? emp : e))
    );

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emp),
    });

    localStorage.setItem("employees", JSON.stringify(employees));
  };

  //  DELETE Employee
  const deleteEmployee = async (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  };

  //  TAB SYNC
  useEffect(() => {
    fetchEmployees();

    const syncTabs = (e) => {
      if (e.key === "employees") {
        setEmployees(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", syncTabs);
    return () => window.removeEventListener("storage", syncTabs);
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
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
