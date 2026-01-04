export const validateEmployee = (data) => {
  if (!data.name || !data.email) return "All fields required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Invalid email";
  return null;
};
