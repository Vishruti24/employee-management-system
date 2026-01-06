import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useLocalStorage("employees", []);

  const addEmployee = (emp) =>
    setEmployees([...employees, { ...emp, id: Date.now() }]);

  const updateEmployee = (updatedEmp) => {
    setEmployees(
      employees.map(emp =>
        emp.id === updatedEmp.id ? updatedEmp : emp
      )
    );
  };
  const deleteEmployee = (id) =>
    setEmployees(employees.filter(e => e.id !== id));

  const toggleStatus = id => {
  setEmployees(
    employees.map(emp =>
      emp.id === id
        ? {
            ...emp,
            status: emp.status === "Active" ? "Inactive" : "Active",
          }
        : emp
    )
  );
};

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      toggleStatus
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
