
export const validateEmployee = (data, employees = [], editingId = null) => {
  if (!data.name || !data.email) {
    return "Name and Email are required";
  }

  const emailExists = employees.some(
    (emp) =>
      emp.email === data.email &&
      String(emp.id) !== String(editingId) // 👈 ignore self
  );

  if (emailExists) {
    return "Employee with this email already exists";
  }

  return null;
};
