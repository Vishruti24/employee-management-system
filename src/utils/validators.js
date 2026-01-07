export const validateEmployee = (emp, employees, editId = null) => {
  if (!/^[a-zA-Z\s]+$/.test(emp.name))
    return "Name must contain only latters";

  if (!/\S+@\S+\.\S+/.test(emp.email))
    return "Invalid email format";

  const emailExists = employees.some(
    e => e.email === emp.email && e.id !== editId
  );
  if (emailExists)
    return "Email already exists";

  return null;
};
